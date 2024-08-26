import Ticket from "../models/ticketModel.js";

export const getmanagerTicket = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    const tickets = await Ticket.find({ manager: name });
    console.log(tickets);
    res.status(200).json(tickets)
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
