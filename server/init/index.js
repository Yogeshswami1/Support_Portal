import mongoose from "mongoose";
import createAdmin from "../models/createAdminModel.js";
import bcrypt from "bcrypt";


import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://saumic:saumic123@cluster0.pxceo4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async () => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });


    const name= "Saumic";
    const email= "saumic@gmail.com";
    const password="Saumic$1";

    try{
      const hashedPassword= await bcrypt.hash(password,10);
      console.log(hashedPassword);
      const admin = new createAdmin({
        name,
        email,
        password:hashedPassword,
      });

      const newAdmin = admin.save();
      console.log(newAdmin);

    }catch(e){
      console.log("cought error while creating new admin");
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
