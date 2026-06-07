import mongoose, { Schema } from "mongoose";

const ChatLeadSchema = new Schema(
  {
    customerName: String,
    email: String,
    interest: String,
    transcript: [String],
    capturedBy: {
      type: String,
      default: "ai-assistant",
    },
  },
  { timestamps: true },
);

export default mongoose.models.ChatLead ||
  mongoose.model("ChatLead", ChatLeadSchema);
