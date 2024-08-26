import createAdmin from "../models/createAdminModel.js";
import authService from "../services/adminLoginService.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await createAdmin.findOne({ email: username });
    if (!admin) {
      console.log("admin not exist");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(admin);
    const token = await authService(username, password);
    res.status(200).json({
      token: token,
      name: admin.name,
      email: admin.email,
      id: admin._id,
      role: "admin",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
