import bcrypt from "bcrypt";
import createUser from "../models/createUserModel.js";
import authService from "../services/login.js";

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await createUser.findOne({ email: username });
    if (!user) {
      console.log("user not exist");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await authService(username, password);

    res.status(200).json({
      token: token,
      name: user.name,
      email: user.email,
      id: user._id,
      role: "user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// import { use } from "bcrypt/promises.js";
// import createUser from "../models/createUserModel.js";
// import authService from "../services/login.js";

// export const userLogin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const token = await authService(username, password);
//     const user = await createUser.findOne({ email: username });

//     res.json({
//       token: token,
//       name: user.name,
//       email: user.email,
//       id: user._id,
//       role: "user",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
