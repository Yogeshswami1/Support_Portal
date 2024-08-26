import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    enrollmentId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    primaryContact: { type: String, required: true },
    secondaryContact: { type: String },
    status: { type: String, required: true },
    documents: {
      pancard: { type: String },
      adhaarCard: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
