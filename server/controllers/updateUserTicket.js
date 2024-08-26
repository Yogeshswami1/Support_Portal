// controllers/ticketController.js
import Ticket from "../models/ticketModel.js";

export const updateUserTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, description, manager } = req.body;

    // Find the ticket by ID and update its fields
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { platform, description, manager },
      { new: true } // This option returns the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error updating ticket" });
  }
};
