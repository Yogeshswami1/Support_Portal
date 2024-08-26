import bcrypt from "bcrypt";
import generateToken from "../utils/jwtUtils.js";
import createAdmin from "../models/createAdminModel.js";

async function adminLoginService(username, password) {
  try {
    const exitingUser = await createAdmin.findOne({ email: username });
    if (!exitingUser) {
      throw new Error("User not found");
    }
    const isPasswordValid = bcrypt.compare(password, exitingUser.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    const token = generateToken(exitingUser);
    return token;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}

export default adminLoginService;
