import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();


app.use(express.json()); //allows us to accept JSON data in the req.body- middleware


app.get("/api/products" ,async (req, res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products})
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({success:false, message:"Server Error"})

  }


})

app.post("/api/products", async (req, res) => {
  const product = req.body; //user will send this data as a request

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product); //create a Product Model object

  try {
    await newProduct.save(); //save it in the db
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async(req, res) => {
  const {id} = req.params; //passing the product is through params]
  console.log("id:", id);

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true, message:"Product deleted Successfully!"})

  } catch (error) {
    //if not found the id
    console.log("Error in deleting products: ", error.message);
    res.status(404).json({success:false, message: "Product not found"})
  }

})


app.put("/api/products/:id", async (req, res)=>{
  const {id} = req.params;

  const product = req.body;  //updated body

  //404 error if id not found
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, message:"Product not found"})

  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true} );
    res.status(200).json({success:true, data: updatedProduct})
  } catch (error) {
    //internal server error
    res.status(500).json({success:false, message:"Server Error"})
  }

})

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});

//XuJTWnZjcJC0GJjm
