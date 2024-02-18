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

router.post("/add_product",upload.single('image'),Product.Add_product);

module.exports = router;