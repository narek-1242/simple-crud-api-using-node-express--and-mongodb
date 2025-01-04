const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stockQuantity: { type: Number, required: true }
});

// Define the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
