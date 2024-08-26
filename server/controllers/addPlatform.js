// try {
//   const { name } = req.body;
//   const newPlatform = new Platform({ name });
//   await newPlatform.save();
//   res
//     .status(201)
//     .json({ message: "Platform added successfully", platform: newPlatform });
// } catch (error) {
//   res.status(400).json({ message: "Error adding platform", error });
// }

import Platform from "../models/platform.js";
export const addPlatform = async (req, res) => {
  try {
    const platfrom = new Platform(req.body);
    await platfrom.save();
    res.status(200).json(platfrom);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error in creating platform" });
  }
};
