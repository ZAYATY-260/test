const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
    pname: {
        type: String,
    },
    Price: {
        type: Number,
    },
    Description: {
        type: String,
    },
    category: {
        type: String,
    },
    sale: {
        type: Number,
    },
    images: {
        type:[String]
    }
}, { timestamps: true });


// Create a text index on the 'pname' field
productsSchema.index({ pname: 'text' });

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
