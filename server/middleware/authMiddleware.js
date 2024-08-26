import jwt from "jsonwebtoken";
import createUser from "../models/createUserModel.js";

const middleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Token Expired" });
  }

  if (!decodedToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const user = await createUser.findById(decodedToken.id);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    req.user = user;
  } catch (err) {
    return res.status(500).json({ error: "Not authenticated" });
  }

  next();
};

export default middleware;
