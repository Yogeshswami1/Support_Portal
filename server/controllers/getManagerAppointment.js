import Appointment from "../models/appointmentModel.js";

export const getManagerAppointment = async (req, res) => {
  try {
    const { name } = req.user;
    console.log(name);
    const allAppointments = await Appointment.find({ manager: name });
    console.log(allAppointments);
    res.status(200).json(allAppointments);
  } catch (error) {
    console.log("Got error while getting user appointment", error);
    res.status(400).json({ message: "appointment could not found" });
  }
};
