const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Product = require("../controller/product_controller.js");
const admin = require("../controller/admin_controller.js");

// Define storage settings for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, file.originalname);
  }
});

// Create Multer instance with the defined storage settings
const upload = multer({ storage: storage });

router.get('/', function (req, res) {
  if (req.session && req.session.user) {
    res.render('pages/signin');
} else {
    // Session is empty, redirect to the sign-in page
    res.render('pages/signin');
}
});

router.post('/signin',admin.signin );

router.get("/add_product",(req,res)=>
{
  if (req.session && req.session.user) {
    res.render('pages/add_product');
} else {
    // Session is empty, redirect to the sign-in page
    res.render('pages/signin');
}
});

router.get("/admin_dashboard",(req,res)=>
{
  if (req.session && req.session.user) {
    // Session is not empty, proceed to the next middleware or route handler
    res.render('pages/admin_dashboard');
} else {
    // Session is empty, redirect to the sign-in page
    res.render('pages/signin');
}
   
});

router.post("/add_product",upload.array('images', 3),Product.Add_product);

router.get("/admin_orders",Product.get_orders_for_admin);

router.get("/order/:id",Product.get_order_by_id);

router.get("/order/delete/:id",Product.Delete_order);

router.get("/view_product",Product.get_product_for_admin);

router.get('/delete_product/:id',Product.Delete_product);

module.exports = router;