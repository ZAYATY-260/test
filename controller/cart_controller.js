
const Product = require( '../models/products_model.js');
const Cart=  require("../models/cart-model.js");


const addCart = async (req, res, next) => {
  const { id: product_id } = req.params;
  size = req.body.size;
  try {
      // Find the product by its ID in the database
      const product = await Product.findById(product_id);

      if (product) {
          // Initialize or retrieve the cart from the session
          let cart = new Cart(req.session.cart ? req.session.cart : {});

          // Add the product to the cart with the specified size
          cart.add(product, product_id, size);

          // Save the updated cart in the session
          req.session.cart = cart;
          console.log(req.session.cart);
          // Redirect the user to the home page or any other appropriate page
          res.redirect('/');
      } else {
          // If the product is not found, redirect the user to the home page
          res.redirect('/');
      }
  } catch (error) {
      // Handle errors appropriately, e.g., logging or sending an error response
      console.error(error);
      next(error);
  }
};



const getCart = async (req, res,next) =>
{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(cart.totalQty != 0)
  {
    res.render('pages/cart',{ products: cart.generateArray() ,subtotal : cart.totalPrice,qt: cart.totalQty ,cart_counter: cart.countProducts() });
  }
  else
  {
    res.render('pages/cart',{ products: undefined ,subtotal : cart.totalPrice , qt: cart.totalQty , cart_counter: cart.countProducts() });
  }
};

const reduceByOne = async (req, res,next) =>
{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  

  if(cart.totalQty != 0)
  {
    cart.removeItem(req.params.id, req.params.size);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/cart');
  }
  else
  {
    res.redirect('/cart');
  }

};

module.exports =  {addCart,getCart,reduceByOne} ;