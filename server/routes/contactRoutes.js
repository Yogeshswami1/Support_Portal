// src/routes/contacts.js
import express from "express";
import {
  getAllContacts,
  addContact,
  getContactById,
  updateContactById,
  deleteContactById,
} from "../controllers/contactController.js";

const router = express.Router();

// Routes for contacts
router.get("/get", getAllContacts);
router.post("/add", addContact);
router.get("/:id", getContactById);
router.put("/:id", updateContactById);
router.delete("/:id", deleteContactById);

export default router;
