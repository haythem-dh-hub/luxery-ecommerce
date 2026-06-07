import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: String,
    email: String,
    total: Number,
    status: {
      type: String,
      default: "pending",
    },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
