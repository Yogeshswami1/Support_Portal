import Appointment from "../models/appointmentModel.js";

export const getUserAppointment = async (req, res) => {
  try {
    const { email } = req.user;
    console.log(email);
    const allAppointments = await Appointment.find({email});
    res.status(200).json(allAppointments);
  } catch (error) {
    console.log("Got error while getting user appointment", error)
    res.status(400).json({message:"appointment could not found"});
  }
};
