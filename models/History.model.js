const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const HistorySchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: "Employee" },
  type: {
    type: String,
    enum: ["attending", "leaving"],
  },
  day: String,
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere",
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("History", HistorySchema, "history");
