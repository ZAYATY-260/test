const express = require('express');
const router = express.Router();
const Product = require("../controller/product_controller.js");
const cart = require("../controller/cart_controller.js");
const order = require("../controller/order_controller.js");



  
router.get('/', Product.get_product_index);

router.get('/cart',cart.getCart);

router.get('/view/:id', Product.get_product_by_id);

//  add to cart 
router.post('/add-to-cart/:id',cart.addCart);

router.get('/cart/delete/:id/:size',cart.reduceByOne);

router.post('/Checkout', order.Add_order);

router.get('/Checkout',order.view_order);

router.get('/search', Product.get_product_search);

router.post('/search', Product.get_product_search_results);



module.exports = router;