import Appointment from "../models/appointmentModel.js";

export const getAppointmentsDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById({ _id: id });
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
