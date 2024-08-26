import Ticket from "../models/ticketModel.js";

export const openUserTicket = async (req, res) => {
  try {
    const { id } = req.user;
    const allTickets = await Ticket.find({ userId: id, status: "Open" });
    console.log(allTickets);
    res.status(200).json(allTickets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
