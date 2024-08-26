import mongoose from "mongoose";

const { Schema, model } = mongoose;

const managerSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const platformSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    managers: [managerSchema],
  },
  { timestamps: true }
);

const Platform = model("Platform", platformSchema);

export default Platform;
