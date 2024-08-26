import mongoose from 'mongoose';
import Manager from '../models/managerModel.js';

export const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createManager = async (req, res) => {
  const manager = req.body;

  const newManager = new Manager(manager);

  try {
    await newManager.save();
    res.status(201).json(newManager);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateManager = async (req, res) => {
  const { id } = req.params;
  const manager = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No manager with that id');
  }

  const updatedManager = await Manager.findByIdAndUpdate(id, manager, {
    new: true,
  });

  res.json(updatedManager);
};

export const deleteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No manager with that id');
  }

  try {
    const deletedManager = await Manager.findOneAndDelete({ _id: id });
    if (!deletedManager) {
      return res.status(404).send('No manager found with that id');
    }
    res.json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
