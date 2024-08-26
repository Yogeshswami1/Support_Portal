import Ticket from "../models/ticketModel.js";

export const newTicket = async (req, res) => {
  const formData = req.body;
  console.log("Form data received:", formData);
  const { email } = req.user;
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    const tickets = await Ticket.find({ email: email });
    console.log(tickets);
    res.status(200).json({
      message: "New ticket created successfully.",
      redirectUrl: "/supportuserdashboard",
      tickets: tickets,
    });
  } catch (e) {
    console.error("Error creating new ticket: " + e);
    res.status(400).json({ message: "Could not create the ticket" });
  }
};
