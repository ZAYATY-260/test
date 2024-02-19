// controllers/productController.js
const fs = require('fs').promises;
const path = require('path');
const Product = require('../models/products_model.js');

// Function to save image and add product
async function saveImageAndAddProduct(name, description, price, image ,sale , category) {
  if (!name || !description || !price || !image) {
    throw new Error('Missing required fields');
  }

  // Ensure that the directory for images exists, if not, create it
  const uploadDir = path.join(__dirname, '..', 'uploads', 'images');
  await fs.mkdir(uploadDir, { recursive: true });

  // Log the path where the image will be saved
  console.log('Image will be saved to:', uploadDir);

  // Save the image to the 'uploads/images' directory
  const imagePath = path.join(uploadDir, image.filename);
  try {
    await fs.rename(image.path, imagePath);
  } catch (error) {
    console.error('Error saving image:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }

  // Create new product with image path
  const newProduct = await Product.create({
    name,
    description,
    price,
    sale,
    category,
    images: imagePath
  });

  return newProduct;
}

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, description, price , sale ,category } = req.body;
      const image = req.file;

      const newProduct = await saveImageAndAddProduct(name, description, price, image, sale ,category);
      
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};
