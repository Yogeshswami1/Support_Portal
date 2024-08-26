import bcrypt from "bcrypt";
import createUser from "../models/createUserModel.js";
import generateToken from "../utils/jwtUtils.js";

async function login(username, password) {
  try {
    const exitingUser = await createUser.findOne({ email: username });
    if(!exitingUser){
        throw new Error("User not found");
    }
    const isPasswordValid = bcrypt.compare(password, exitingUser.password);
    if(!isPasswordValid){
        throw new Error("Incorrect password");
    }
    const token =generateToken(exitingUser);
    return token;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}

export default login;