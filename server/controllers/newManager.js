import createManager from "../models/createManagerModel.js"; // Assuming createManager is a Mongoose model
import bcrypt from "bcrypt";

export const newManager = async (req, res) => {
  try {
    const { name, email, platform, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const manager = new createManager({
      name,
      email,
      platform,
      password: hashedPassword,
    });

    const savedManager = await manager.save();
    res.status(200).json({ savedManager });
  } catch (error) {
    console.error("Caught error while creating new manager:", error);
    res.status(400).json({ message: "Error in creating new manager", error });
  }
};

// export const newUser = async (req, res) => {
//   try {
//     const { name, email, platform, enrollmentNumber, password } = req.body;

//     // const newUser = new createUser(req.body);
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("hashed password is : ", hashedPassword);
//     // await newUser.save();
//     const newUser = new createUser({
//       name,
//       email,
//       platform,
//       enrollmentNumber,
//       password: hashedPassword,
//     });
//     const savedUser = await newUser.save();
//     console.log("user stored in db :", savedUser);
//     res.status(200).json({ savedUser });
//   } catch (error) {
//     console.error("Error creating new user", error);
//     res.status(500).json({ error: "Could not create new user" });
//   }
// };
