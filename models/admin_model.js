const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });



const Product = mongoose.model('admin', productsSchema);

module.exports = Product;
