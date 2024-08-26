import createManager from "../models/createManagerModel.js";
import authService from "../services/managerLoginService.js";
import bcrypt from "bcrypt";

export const managerLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const manager = await createManager.findOne({ email: username });
    if (!manager) {
      console.log("manager not exist");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(manager);
    const token = await authService(username, password);
    res.status(200).json({
      token: token,
      name: manager.name,
      email: manager.email,
      id: manager._id,
      role: "manager",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
