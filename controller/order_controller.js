
const user = require("../models/user_model.js");
const Cart =  require("../models/cart-model.js");




 Add_order = async (req, res, next) => {
    try {
        // Ensure session is initialized
        if (!req.session.cart) {
            req.session.cart = {};
        }

        let cart = new Cart(req.session.cart);

        // Accessing total price
        cart.totalPrice = cart.totalPrice + 50;

        // Save updated cart back to session
        req.session.cart = cart;

        console.log(req.body);
        console.log(req.session.cart);

        // Check if cart has items
        if (Object.keys(cart.items).length === 0) {
            return res.status(400).send("Cart is empty. Cannot proceed with the order.");
        }

        // Check if email is provided
        // if (!req.body.email) {
        //     return res.status(400).send("Email is required.");
        // }

        // Check if user already exists based on email address
        // const existingUser = await user.findOne({ Email: req.body.email });
        // if (existingUser) {
        //     return res.status(400).send("User with this email address already exists.");
        // }

        const userData = {
            Fname: req.body.firstName,
            Lname: req.body.lastName,
            Email: req.body.email,
            Address: req.body.address,
            Phonenumber: req.body.phonenumber,
            cart: req.session.cart,
            // Additional data can be added here
        };

        const newUser = new user(userData);

        // Save the user document
        await newUser.save();

        // Reset session cart and delete all items
        req.session.cart = null;
        cart.deleteAllItems();

        res.redirect('/');
    } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).send("Error occurred while saving user data. Please try again later.");
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
