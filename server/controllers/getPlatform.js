import Platform from "../models/platform.js";
export const getPlatform = async (req, res) => {
  try {
    const platforms = await Platform.find({});
    res.status(200).json(platforms);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching platforms" });
  }
};
