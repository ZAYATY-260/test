const product = require("../models/products_model.js");
const Cart=  require("../models/cart-model.js");
const user=  require("../models/user_model.js");
const path = require('path');
const fs = require('fs');
const mongo = require('mongoose')

  // Get products by date
 
  // Other controller methods...


const get_product_index = async (req, res, next) => {
  
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  try {
    const products = await product.find();
    
    // Extract file paths from each product's images array
    const productImages = products.map(product => product.images).flat();
    
    res.render('pages/index', { product_client: products, product_images: productImages, isEmpty: products.length >= 4 ? false : true, cart_counter: cart.countProducts() });
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handling middleware
  }

}

const get_product_for_admin = async (req, res) => {

  if (req.session && req.session.user) {
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
  else
  {
    res.render('pages/signin');
  }
}

const get_product_search_results = async (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    const query = req.body.query;
    product.find({ $text: { $search: query } })
    .then(products => {
        res.render('pages/search', {  product_search: products ,  cart_counter: cart.countProducts()});
    })
    .catch(err => console.log(err));
};

const get_product_search = async (req, res) => {

  let cart = new Cart(req.session.cart ? req.session.cart : {});
  product.find()
    .then(products => {
      console.log(products);
      res.render('pages/search', { product_search: products ,  cart_counter: cart.countProducts()});
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  
}

const get_orders_for_admin = async (req, res) => {
  if (req.session && req.session.user) {
  user.find()
    .then(products => {
      console.log(products);
      res.render('pages/admin_order', { order: products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  }
  else
  {
    res.render('pages/signin');
  }
}


const get_order_by_id = async (req, res) => {
  if (req.session && req.session.user) {
  let cart;
  let data = await user.find({_id:req.params.id});

  if(data)
  {
    data.forEach((products) => {

    cart = new Cart(products.cart);
    products.items = cart.generateArray();

    res.render("pages/admin_view_order" ,{order:products});
    });
  }
  else
  {
    res.render("pages/admin_view_order" ,{order:products});
  }
}
else
{
  res.render('pages/signin');
}
};



const get_product_by_id = async (req, res) => {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  const id = req.params.id;
  product.findById(id)
    .then(result => {
      // Check if the result exists and has images
      if (!result || !result.images) {
        throw new Error('Product not found or has no images');
      }
      
      // Extract file paths from the product's images array
      const productImages = result.images;
  
      res.render('pages/view-product', { product_client: result, product_images: productImages, cart_counter: cart.countProducts() });
    })
    .catch(err => {
      console.error(err);
      // Handle the error appropriately, such as rendering an error page
      res.status(500).render('pages/error', { error: err });
    });
  
}
const get_product_admin = async (req, res, next) => {
  if (req.session && req.session.user) {
    product.find()
    .then(result => {
      res.render('view_product', { product: result });
    })
    .catch(err => {
      console.log(err);
    });
  }
  else
  {
    res.render('pages/signin');
  }

}
const Add_product = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const imgFiles = req.files;
    const imgPaths = imgFiles.map(file => file.originalname);

    const newProduct = new product({
      pname: req.body.pname,
      Price: req.body.Price,
      Description: req.body.Description,
      category: req.body.category,
      sale: req.body.sale,
      images: imgPaths // Assuming 'images' is the field to store file paths
    });

    await newProduct.save();
    res.render('pages/add_product');

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


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

const Delete_order = (req, res) => 
{
  if (req.session && req.session.user) {
  const productId = req.params.id;

  user.findByIdAndDelete(productId)
  .then(result => {
    if (!result) {
      return res.status(404).send('Product not found');
    }
    else
    {
      res.render('pages/admin_view_order');
    }
  })
}
  else
  {
    res.render('pages/signin');
  }
}

const Delete_product = (req, res) => {
  if (req.session && req.session.user) {
    const productId = req.params.id;
  
    product.findByIdAndDelete(productId)
      .then(result => {
        if (!result) {
          return res.status(404).send('Product not found');
        }
  
        // Delete the associated image files
        result.images.forEach(imgFileName => {
          const imagePath = path.join(__dirname, '../public/images/', imgFileName);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error deleting image file');
            }
          });
        });
  
        res.render('pages/add_product'); // Render appropriate view after deletion
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    res.render('pages/signin');
  }
  
};

module.exports = { get_product_admin, get_product_index,get_order_by_id,Delete_order, Add_product,get_orders_for_admin, Delete_product, Edit_product  , get_product_by_id , get_product_for_admin ,get_product_search , get_product_search_results};