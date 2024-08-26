import createManager from "../models/createManagerModel.js";
import createUser from "../models/createUserModel.js";
import Ticket from "../models/ticketModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const addCommentAndClose = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { comment, name, role } = req.body;
    

    let email;
    let status = "Closed";
    

    console.log("comment from front end", comment, ",", name, ",", role);

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const { userId } = ticket;
    const managerName = ticket.manager;
    console.log("user id of ticket", userId);

    const User = await createUser.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    email = User.email;
    console.log("user email", email);
    console.log(managerName);

    const ManagerData = await createManager.findOne({ name: managerName });
    if (!ManagerData) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const managerEmail = ManagerData.email;
    console.log("manager email", managerEmail);

    ticket.comments.push({ comment, name });
    ticket.status = status;
    await ticket.save();

    // Prepare email content
    const emailContent = `
      <h2>Ticket Update</h2>
      <p><strong>Ticket ID:</strong> TCK${ticket.ticketId}</p>
      <p><strong>Comment:</strong> ${comment}</p>
      <p><strong>Added by:</strong> ${name}</p>
      <p><strong>Status:</strong> ${status}</p>
    `;

    // Email options for user
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Update on your support ticket",
      html: emailContent,
    };

    // Email options for manager
    const mailOptionsManager = {
      from: process.env.EMAIL_USER,
      to: managerEmail,
      subject: "Update on a managed support ticket",
      html: emailContent,
    };

    // Send emails
    transporter.sendMail(mailOptionsUser, (error, info) => {
      if (error) {
        console.log("Error sending email to user:", error);
      } else {
        console.log("Email sent to user:", info.response);
      }
    });

    transporter.sendMail(mailOptionsManager, (error, info) => {
      if (error) {
        console.log("Error sending email to manager:", error);
      } else {
        console.log("Email sent to manager:", info.response);
      }
    });

    res.status(200).json({ message: "Comment added successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// import createManager from "../models/createManagerModel.js";
// import createUser from "../models/createUserModel.js";
// import Ticket from "../models/ticketModel.js";

// export const addComment = async (req, res) => {
//   try {
//     const ticketId = req.params.id;
//     const { comment, name, role } = req.body;
//     let email;
//     let status;
//     if (role === "manager") {
//       status = "Waiting for customer reply";
//     } else {
//       status = "Waiting for manager reply";
//     }

//     console.log("comment from front end", comment, ",", name, ",", role);

//     const ticket = await Ticket.findById(ticketId);
//     const { userId } = ticket;
//     const managerName = ticket.manager;
//     console.log("user id of ticket", userId);
//     const User = await createUser.findById(userId);
//     email = User.email;
//     console.log("user email", email);
//     console.log(managerName);

//     const ManagerData = await createManager.findOne({ name: managerName });
//     const managerEmail = ManagerData.email;
//     console.log("manager email", managerEmail);

//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }

//     ticket.comments.push({ comment, name });
//     ticket.status = status;
//     await ticket.save();

//     res.status(200).json({ message: "Comment added successfully", ticket });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding comment", error });
//   }
// };
