import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClickSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

const Click = model("Click", ClickSchema);
export default Click;
