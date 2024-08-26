import bcrypt from "bcrypt";
import generateToken from "../utils/jwtUtils.js";
import createManager from "../models/createManagerModel.js";

async function managerLoginService(username, password) {
  try {
    const exitingUser = await createManager.findOne({ email: username });
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

export default managerLoginService;
