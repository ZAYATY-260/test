const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({

    Fname: {
        type: String,
    },
    Lname: {
        type: String,
    },
    Address: {
        type: String,
    },
    Email: {
        type: String,
    },
    Phonenumber: {
        type: String,
    },
    cart: {
        type: Object,
    }
}, { timestamps: true });

const user = mongoose.model('user', productsSchema);

module.exports = user;
