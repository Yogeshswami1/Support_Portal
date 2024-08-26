import Appointment from "../models/appointmentModel.js";

export const newAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      number,
      subject,
      enrollment,
      platform,
      manager,
      description,
      date,
      time,
      ad,
    } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      number,
      subject,
      enrollment,
      platform,
      manager,
      description,
      date,
      time,
      ad,
    });

    const appointment = await newAppointment.save();
    console.log(appointment)
    res
      .status(200)
      .json({ message: "New appointment created successfully", appointment });
  } catch (error) {
    console.error("Error creating appointment", error);
    res.status(500).json({ error: "Could not create new appointment" });
  }
};
