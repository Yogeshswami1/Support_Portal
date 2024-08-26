import mongoose from "mongoose";
const { Schema, model } = mongoose;

const createUserSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  platform:{
    type:String,
    required:true,
  },
  enrollmentNumber:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true,
  }
});
const createUser = model("createUser", createUserSchema);
export default createUser;
