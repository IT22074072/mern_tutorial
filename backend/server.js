import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body- middleware

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

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});

//XuJTWnZjcJC0GJjm
