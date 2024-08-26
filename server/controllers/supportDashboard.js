import Ticket from "../models/ticketModel.js";

export const supportDashborad = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const allTickets = await Ticket.find({ userId: userId });
    console.log(allTickets);

    res
      .status(200)
      .json({ redirectUrl: "/supportadmindashboard", allTickets: allTickets });
  } catch (e) {
    console.log("error occured" + e);
    res.status(400).json({ message: "failed to fetch data" });
  }
};

// app.post("/api/support/dashboard", async (req, res) => {
//   const { email } = req.body;
//   const allData = await Ticket.find({ email: email });
//   console.log(allData);

//   res.status(200).json({ redirectUrl: "/supportadmindashboard" });
// });
