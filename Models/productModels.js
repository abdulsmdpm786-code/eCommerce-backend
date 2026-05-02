import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number, required: true },
  rating: { type: Number },
  numReviews: { type: Number },
  isFeatured: { type: String },
  createdAt: { type: String, required: true },
});

export const productModel  = mongoose.model("Products", productSchema)

