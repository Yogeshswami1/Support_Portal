import mongoose from "mongoose";
import Appointment from "../models/appointmentModel.js";

export const review = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { comment, rating } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.userReview = { comment, rating };
    const updatedAppointment = await appointment.save();
    console.log(updatedAppointment);

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review" });
  }
};
