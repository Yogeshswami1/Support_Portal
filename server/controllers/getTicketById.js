import Ticket from "../models/ticketModel.js";

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const allTickets = await Ticket.findById({ _id: id });
    console.log(allTickets);
    res.status(200).json(allTickets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
