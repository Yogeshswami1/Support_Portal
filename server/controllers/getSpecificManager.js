import createManager from "../models/createManagerModel.js";

export const getSpecificManager = async (req, res) => {
  try {
    const { id } = req.params; // Destructure the id from req.params
    const manager = await createManager.findOne({ _id: id }); // Correct query format
    if (manager) {
      console.log(manager);
      res.status(200).json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error in finding manager" });
  }
};
