import express from "express";
import { newAppointment } from "../controllers/newAppointment.js";
import { newUser } from "../controllers/newUser.js";
import { newManager } from "../controllers/newManager.js";
import { userLogin } from "../controllers/userLogin.js";
import { newTicket } from "../controllers/newTicket.js";
import { supportDashborad } from "../controllers/supportDashboard.js";
import { managerLogin } from "../controllers/managerLogin.js";
import createUser from "../models/createUserModel.js";
import middleware from "../middleware/authMiddleware.js";
import { getTicket } from "../controllers/getTicket.js";
import { getUserAppointment } from "../controllers/getUserAppointments.js";
import { openUserTicket } from "../controllers/openUserTicket.js";
import { getmanagerTicket } from "../controllers/getManagerTicket.js";
import managerMiddleware from "../middleware/managerMiddleware.js";
import { getManagerAppointment } from "../controllers/getManagerAppointment.js";
import { openManagerTicket } from "../controllers/getManagerOpenTicket.js";
import { adminLogin } from "../controllers/adminLogin.js";
import { getAllTicket } from "../controllers/getAllTicket.js";
import { getAllAppointment } from "../controllers/getAllAppointments.js";
import { getAllManagers } from "../controllers/getAllManagers.js";
import { getTicketById } from "../controllers/getTicketById.js";
import { updateUserTicket } from "../controllers/updateUserTicket.js";
import { updateAppointment } from "../controllers/updateAppointment.js";
import { closeTicket } from "../controllers/closeTicket.js";
import { getAllOpenTicket } from "../controllers/getAllOpenTicket.js";
import { review } from "../controllers/review.js";
import { managerReview } from "../controllers/managerReview.js";
import { addComment } from "../controllers/addComment.js";
import { getAppointmentsDetails } from "../controllers/getAppointmentDetails.js";
import { addCommentAndClose } from "../controllers/addAndCloseTicekt.js";
import { makeHoliday } from "../controllers/makeHoliday.js";
import { getHoliday } from "../controllers/getHoliday.js";
import { endHoliday } from "../controllers/endHoliday.js";
import { getSpecificManager } from "../controllers/getSpecificManager.js";
import { handleButtonClick } from "../controllers/clickController.js";
import { addPlatform } from "../controllers/addPlatform.js";
import { getPlatform } from "../controllers/getPlatform.js";
import { assignPlatform } from "../controllers/assignPlatform.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await createUser.find({});
  console.log(users);
  if (users) {
    res.json(users);
  } else {
    res.json({ message: "user not found" });
  }
});

router.post("/appointmentRoute", newAppointment);
router.get("/getappointments", middleware, getUserAppointment);
router.post("/create-user", newUser);
router.post("/create-manager", newManager);

router.post("/user-login", userLogin);
router.post("/managerlogin", managerLogin);
router.post("/newticket", middleware, newTicket);
router.get("/getticket", middleware, getTicket);
router.post("/make-holiday", makeHoliday);
router.get("/holiday", getHoliday);

router.post("/click", handleButtonClick);

router.get("/ticketbyid/:id", getTicketById);
router.put("/updateuserticket/:id", updateUserTicket);
router.put("/updateappointmentbyid/:id", updateAppointment);
router.put("/closeticket/:id", closeTicket);
router.post("/end-holiday", endHoliday);
router.get("/getmanager/:id", getSpecificManager);
router.post("/add-platform", addPlatform);
router.get("/getplatform", getPlatform);
router.put("/assign-platform/:id", assignPlatform);
router.get("/get-platform", getPlatform);

router.post("/adminlogin", adminLogin);
router.get("/openticket", middleware, openUserTicket);
router.post("/dashboard", middleware, supportDashborad);
router.get("/getmanagerticket", managerMiddleware, getmanagerTicket);
router.get("/getmanagerappointments", managerMiddleware, getManagerAppointment);
router.get("/openmanagerticket", managerMiddleware, openManagerTicket);
router.get("/getallticket", getAllTicket);
router.get("/getallopenticket", getAllOpenTicket);
router.get("/getallappointments", getAllAppointment);
router.get("/getallmanagers", getAllManagers);
router.post("/reviewappointment/:id", review);
router.put("/addmanagercomment/:id", managerReview);
router.put("/addcommentandclose/:id", addCommentAndClose);
router.put("/addComment/:id", addComment);

router.get("/appointmentbyid/:id", getAppointmentsDetails);

export default router;

// app.post("/api/support/managerlogin", (req, res) => {
//   const formData = req.body;
//   console.log("Form data received:", formData);

//   res.status(200).json({ redirectUrl: "/supportmanagerdashboard" });
// });
