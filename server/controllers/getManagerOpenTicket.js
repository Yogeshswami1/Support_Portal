import Ticket from "../models/ticketModel.js";

export const openManagerTicket = async (req, res) => {
  try {
    const { name } = req.user;
    const allTickets = await Ticket.find({ manager: name, status: "open" });
    console.log(allTickets);
    res.status(200).json(allTickets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
