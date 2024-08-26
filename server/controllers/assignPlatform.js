import createManager from "../models/createManagerModel.js";
import Platform from "../models/platform.js";
export const assignPlatform = async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findOne(req.body);
    const manager = await createManager.findById({ _id: id });
    const name = manager.name;
    const plat = platform.platform;
    manager.platform = plat;
    manager.save();
    console.log(name);
    platform.managers.push({ name });
    await platform.save();
    res
      .status(200)
      .json({ message: "Platform assigned successfully", platform });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error in assigning platform" });
  }
};
