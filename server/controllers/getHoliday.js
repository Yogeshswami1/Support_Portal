import Holiday from "../models/holidayModel.js";

export const getHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.find({});
    console.log(holiday)
    res.status(200).json(holiday);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching holidays" });
  }
};
