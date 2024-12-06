import mongoose from "mongoose";

//creating the schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);


//creating the model
const Product = mongoose.model('Product', productSchema);
//products

export default Product;