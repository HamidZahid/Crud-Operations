const express = require('express')
const Product = require('../models/Product.model.js')
const {getProducts , getProduct , createProduct,updateProduct, deleteProduct} = require('../controllers/product.controller.js')
const router = express.Router()

router.get("/", getProducts);
router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;