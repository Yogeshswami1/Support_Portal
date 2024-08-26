import Appointment from "../models/appointmentModel.js";

export const getAllAppointment = async (req, res) => {
  try {
    const allAppointments = await Appointment.find({});
    console.log(allAppointments);
    res.status(200).json(allAppointments);
  } catch (error) {
    console.log("Got error while getting user appointment", error);
    res.status(400).json({ message: "appointment could not found" });
  }
};
