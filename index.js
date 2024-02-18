const express = require("express");
const mongoose = require("mongoose");
const product  = require('./models/Product.model.js');
const Product = require("./models/Product.model.js");
const productRoutes = require('./routes/product.route.js')
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes

app.use('/api/products', productRoutes)

app.get("/", (req, res) => {
  res.send("Hello From Node API ");
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
  });


  app.get("/api/products/:id", async (req, res) => {
    try {
        const {id}  = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
  });


app.post("/api/products", async (req, res) => {
 try {
    const product = await Product.create(req.body);
    res.status(200).json(product)
 } catch (error) {
    res.status(500).json({message: error.message})
    
 }
});

// update a product

app.put('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product  = await Product.findByIdAndUpdate(id , req.body);
        if (!product) {
            return res.status(404).json({message: "Product Not Found"})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
});

//delete

app.delete('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product  = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product Not Found"})
        }
       
        res.status(200).json({message: "Producted Has been deleted"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
});

mongoose
  .connect(
    "mongodb+srv://hamid:Hamid<Faid3867@backenddb.sdp5dqe.mongodb.net/Node-Api?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected Database");
    app.listen(3000, () => {
      console.log("Server is Running to Port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
