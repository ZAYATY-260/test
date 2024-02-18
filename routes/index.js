const express = require('express');
const router = express.Router();
const Product = require("../controller/product_controller.js");
const cart = require("../controller/cart_controller.js");
const order = require("../controller/order_controller.js");

router.get('/', Product.get_product_index);

router.get('/cart',cart.getCart);

router.get('/view/:id', Product.get_product_by_id);

//  add to cart 
router.get('/add-to-cart/:id',cart.addCart);

router.get('/cart/delete/:id',cart.reduceByOne);

router.post('/chekout', order.Add_order);

router.get('/chekout',order.view_order);

module.exports = router;