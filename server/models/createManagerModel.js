import mongoose from "mongoose";
const { Schema, model } = mongoose;

const createManagerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

const createManager = model("createManager", createManagerSchema);
export default createManager;
