// src/models/Contact.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  primaryContact: {
    type: String,
    required: true,
  },
  secondaryContact: {
    type: String,
    required: true,
  },
});

const Contact = model("Contact", contactSchema);

export default Contact;
