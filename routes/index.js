const express = require('express');
const router = express.Router();
const Product = require("../controller/product_controller.js");
const cart = require("../controller/cart_controller.js");

router.get('/', Product.get_product_index);

router.get('/cart',cart.getCart);

router.get('/view/:id', Product.get_product_by_id);

//  add to cart 
router.get('/add-to-cart/:id',cart.addCart);

router.get('/cart/delete/:id',cart.reduceByOne);

module.exports = router;