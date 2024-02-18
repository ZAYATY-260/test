
const user = require("../models/user_model.js");
const Cart =  require("../models/cart-model.js");




const Add_order = async (req, res, next) => 
{ 
    console.log(req.body);

        const products = new user({
         Fname: req.body.firstName,
         Lname: req.body.lastName,
         Email: req.body.email,
         Address: req.body.address,
         Phonenumber: req.body.phonenumber,
        
        });
        

        
        await products.save();
 

        res.redirect('/');
}
const view_order = async (req, res, next) => 
{
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('pages/order', {  cart_counter: cart.countProducts() }  );

}


module.exports = { Add_order , view_order};