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
    required: true
  }

});


const SettingsSchema = new mongoose.Schema({
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere"
 }
});



module.exports = mongoose.model("Settings", SettingsSchema, "settings");