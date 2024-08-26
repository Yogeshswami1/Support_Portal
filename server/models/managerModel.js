import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  documents: {
    pancard: {
      type: String,
      required: true,
    },
    adhaarCard: {
      type: String,
      required: true,
    },
  },
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;
