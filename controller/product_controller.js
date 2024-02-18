const product = require("../models/products_model.js");
const Cart=  require("../models/cart-model.js");
const path = require('path');
const fs = require('fs');
const mongo = require('mongoose')

  // Get products by date
 
  // Other controller methods...


const get_product_index = async (req, res, next) => {
  
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  product.aggregate([{ $sample: { size: 4 } }])
  .then(result => {
    
    res.render('pages/index', { product_client: result, isEmpty: result.length >= 4 ? false : true ,  cart_counter: cart.countProducts()  });
  })
  .catch(err => {
    console.log(err);
  });

}

const get_product_for_admin = async (req, res) => {


  product.find()
    .then(products => {
      console.log(products);
      res.render('pages/view_product_admin', { product_admin: products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  
}

const get_product_by_id = async (req, res) => {

  let cart = new Cart(req.session.cart ? req.session.cart : {});
  const id = req.params.id;
  product.findById(id)
    .then(result => {
    
      res.render('pages/view-product', { product_client: result ,  cart_counter: cart.countProducts() }  );
    })
    .catch(err => {
      console.log(err);
    });
}
const get_product_admin = async (req, res, next) => {
    product.find()
    .then(result => {
      res.render('view_product', { product: result });
    })
    .catch(err => {
      console.log(err);
    });
}
const Add_product = async (req, res, next) => {

  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const imgFile = req.file;

      const products = new product({
        pname: req.body.name,
        Price: req.body.price,
        Description: req.body.description,
        category: req.body.category,
        Image: imgFile.originalname,
      });

      await products.save();
      res.render('pages/add_product');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

const Edit_product = (req, res, next) => {

  let imgFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {

    product.findByIdAndUpdate(req.params.id,{      
              Name: req.body.Name,
              Catergory: req.body.Catergory,
              Description: req.body.Description,
              Price: req.body.Price,
              Rating: req.body.Rating,
              Image: req.params.img 
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    
  }
  else
  {
    imgFile = req.files.Image;
    uploadPath = path.join(__dirname, '../public/images/' + req.body.Name + path.extname(imgFile.name));
  
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err)
        res.status(500).send(err);
  
  
          req.body.Image = req.body.Name + path.extname(imgFile.name);
          console.log(req.body);
          product.findByIdAndUpdate(req.params.id,req.body)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    })

    fs.unlink(path.join(__dirname, '../public/images/' + req.params.img), (err) => {
      if (err) {
        throw err;
      }
    });
  }

  res.redirect('/admin/view-product');

};

const Delete_product = (req, res) => {
  const productId = req.params.id;
  const imgFileName = req.params.img;

  // Check if imgFileName is provided
  if (!imgFileName) {
    return res.status(400).send('Image file name is required');
  }

  product.findByIdAndDelete(productId)
    .then(result => {
      if (!result) {
        return res.status(404).send('Product not found');
      }

      // Delete the associated image file
      const imagePath = path.join(__dirname, '../public/images/', imgFileName);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error deleting image file');
        }
        res.render('pages/add_product');
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = { get_product_admin, get_product_index, Add_product, Delete_product, Edit_product  , get_product_by_id , get_product_for_admin};