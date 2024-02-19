
const user = require("../models/user_model.js");
const Cart =  require("../models/cart-model.js");




const Add_order = async (req, res, next) => 
{ 
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        
        console.log(req.body );
        console.log(req.session.cart );

        const products = new user(
        {
         Fname: req.body.firstName,
         Lname: req.body.lastName,
         Email: req.body.email,
         Address: req.body.address,
         Phonenumber: req.body.phonenumber,
         cart: req.session.cart,
        });

        
        if(await products.save())
        {
            req.session.cart = null;
            cart.deleteAllItems();
            res.redirect('/');
        }
}
 
      
const view_order = async (req, res, next) => 
{
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    if(cart.totalQty != 0)
    {
        res.render('pages/order', {  cart_counter: cart.countProducts() }  );
    }
    else
    {
        res.render('pages/404');
    }


}


module.exports = { Add_order , view_order};