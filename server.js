const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel.js");
const app = express();

app.use(express.json()); // gunakan json agar bisa mengirim data dalam bentuk json
app.use(express.urlencoded({ extended: false })); // ini digunakan agar update database bisa di isi melalui form data bukan json

// routes
app.get("/", (req, res) => {
  res.send("hallo");
});

// get all data
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); //{} : berarti kita mengambil semua produk
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id); //{} : berarti kita mengambil semua produk
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update data
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // cannot find product
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with ID : ${id}` });
    }
    // agar data langsung update di api
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create data
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product by id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/blog", (req, res) => {
  res.send("hallo blog nama saya tomis");
});

mongoose
  .connect(
    "mongodb+srv://tomisaputra:Tommyajah-2001@tomisapi.iqgpimq.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo db");
    app.listen(3000, () => {
      console.log("server running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("error connect to mongo db");
  });
