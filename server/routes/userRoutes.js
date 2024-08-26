// import express from "express";
// import {
//   getUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";

// const router = express.Router();

// router.route("/").get(getUsers).post(createUser);
// router.route("/:id").put(updateUser).delete(deleteUser);

// export default router;

import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Define routes for user operations
router.get("/get", getUsers);
router.post("/createuser", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

