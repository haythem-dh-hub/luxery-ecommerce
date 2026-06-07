import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    type: String,
    price: Number,
    stock: Number,
    rating: Number,
    badge: String,
    image: String,
    summary: String,
    notes: [String],
    automationTag: String,
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
