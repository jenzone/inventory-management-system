import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("item", ItemSchema);
