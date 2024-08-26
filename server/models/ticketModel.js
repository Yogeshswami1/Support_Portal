import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const { Schema, model } = mongoose;
const AutoIncrement = mongooseSequence(mongoose);

const commentSchema = new Schema({
  comment: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ticketSchema = new Schema({
  ticketId: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  assignee: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

ticketSchema.plugin(AutoIncrement, { inc_field: "ticketId" });

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
