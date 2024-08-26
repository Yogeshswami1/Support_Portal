import Holiday from "../models/holidayModel.js";

export const endHoliday = async (req, res) => {
  try {
    await Holiday.deleteMany({});
    res.status(200).json({
      message: "New holiday created successfully.",
    });
  } catch (e) {
    console.error("Error creating new holiday: " + e);
    res.status(400).json({ message: "Could not create the holiday" });
  }
};
