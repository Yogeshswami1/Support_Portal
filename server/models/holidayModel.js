import mongoose from "mongoose";
const { Schema, model } = mongoose;

const holidaySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  message:{
    type:String,
    required:true,
  }
 
});
const Holiday = model("Holiday", holidaySchema);
export default Holiday;
