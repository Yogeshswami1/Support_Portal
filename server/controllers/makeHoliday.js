import Holiday from "../models/holidayModel.js";

export const makeHoliday = async (req, res) => {
  const formData = req.body;
  try {
    const newHoliday = new Holiday(req.body);
    await newHoliday.save();
    res.status(200).json({
      message: "New holiday created successfully.",
    });
  } catch (e) {
    console.error("Error creating new holiday: " + e);
    res.status(400).json({ message: "Could not create the holiday" });
  }
};
