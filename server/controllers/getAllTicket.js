import Ticket from "../models/ticketModel.js";

export const getAllTicket = async (req, res) => {
  try {
    const allTickets = await Ticket.find({});
    console.log(allTickets);
    res.status(200).json(allTickets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
