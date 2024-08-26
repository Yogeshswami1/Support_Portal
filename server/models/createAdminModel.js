import mongoose from "mongoose";
const { Schema, model } = mongoose;

const createAdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const createAdmin = model("createAdmin", createAdminSchema);
export default createAdmin;
