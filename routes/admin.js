const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Product = require("../controller/product_controller.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })



router.get("/add_product",(req,res)=>
{
    res.render('pages/add_product');
});

router.get("/admin_dashboard",(req,res)=>
{
    res.render('pages/admin_dashboard');
});

router.post("/add_product",upload.single('image'),Product.Add_product);

router.get("/admin_orders",Product.get_orders_for_admin);

router.get("/order/:id",Product.get_order_by_id);

router.get("/order/delete/:id",Product.Delete_order);

router.get("/view_product",Product.get_product_for_admin);

router.get('/delete_product/:id/:img',Product.Delete_product);

module.exports = router;