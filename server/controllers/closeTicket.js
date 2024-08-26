
import Ticket from "../models/ticketModel.js";

export const closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const status = "Closed";

    // Find the ticket by ID and update its fields
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { status },
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
