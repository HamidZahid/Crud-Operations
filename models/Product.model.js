const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter the product"],
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
