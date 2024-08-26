import createUser from "../models/createUserModel.js";
import bcrypt from "bcrypt";

export const newUser = async (req, res) => {
  try {
    const { name, email, platform, enrollmentNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password is : ", hashedPassword);
    // await newUser.save();
    const newUser = new createUser({
      name,
      email,
      platform,
      enrollmentNumber,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("user stored in db :", savedUser);
    res.status(200).json({ savedUser });
  } catch (error) {
    console.error("Error creating new user", error);
    res.status(500).json({ error: "Could not create new user" });
  }
};
