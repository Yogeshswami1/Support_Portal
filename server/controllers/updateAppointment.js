// controllers/ticketController.js
import Appointment from "../models/appointmentModel.js";

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const status = "closed";

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true } // This option returns the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error updating ticket" });
  }
};
