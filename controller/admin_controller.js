// controllers/productController.js
const fs = require('fs').promises;
const path = require('path');
const Product = require('../models/products_model.js');
const User = require('../models/admin_model.js');





const signin = async (req, res, next) =>
 {

  // const { username, password } = req.body;

  // try {
  //     // Check if the username already exists
  //     const existingUser = await User.findOne({ username });
  //     if (existingUser) {
  //         return res.status(400).send('Username already exists');
  //     }

  //     // Create a new user document
  //     const newUser = new User({
  //         username,
  //         password // You should hash passwords before storing them
  //     });

  //     // Save the new user document to the database
  //     await newUser.save();
  //     res.status(201).send('User created successfully');
  // } catch (err) {
  //     console.error('Error adding user:', err);
  //     res.status(500).send('Internal Server Error');
  // }

  const { username, password } = req.body;
    console.log(req.body);
  try {
      // Find user in the database by username
      const user = await User.findOne({ username: username });
      console.log(user);
      if (user) {
          // Check if password matches (you should hash passwords in production)
          if (user.password === password) {
              // Store user data in session
              req.session.user = { username: user.username };
              // Redirect to dashboard or success page
              res.render('pages/admin_dashboard');
          } else {
              // Password doesn't match
              console.log('Password incorrect');
              res.redirect('/?error=1');
          }
      } else {
          // User not found
          console.log('User not found');
          res.redirect('/?error=1');
      }
  } catch (err) {
      console.error('Error finding user:', err);
      res.redirect('/?error=1');
  }
}
 

  


module.exports = {signin};