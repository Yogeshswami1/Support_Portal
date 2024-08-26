import createManager from "../models/createManagerModel.js";

export const getAllManagers = async (req, res) => {
  try {
    const allManagers = await createManager.find({});
    // console.log(allManagers);
    res.status(200).json(allManagers);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
