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

const SettingsSchema = new mongoose.Schema({
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere",
  },
  allowedDistance: Number, //meters
  attendanceTime: Number, //hours
  allowedAttendanceTime: Number, //hours
  leavingTime: Number, //hours
  allowedLeavingTime: Number, //hours
});

module.exports = mongoose.model("Settings", SettingsSchema, "settings");
