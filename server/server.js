import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import managerRoutes from "./routes/managerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRouter.js";
import supportRoutes from "./routes/supportRoutes.js";
import middleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/test", middleware, (req, res) => {
  console.log(req.user.name);
});
app.use("/api/managers", managerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
const PORT = process.env.PORT || 5000;

app.get("/data", middleware, async (req, res) => {
  const user = req.user;
  res.json({ user });
});

app.use("/api/support", supportRoutes);

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
