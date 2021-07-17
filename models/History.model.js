const mongoose = require("mongoose");



const HistorySchema = new mongoose.Schema({
  employee: {type: mongoose.Types.ObjectId, ref: "Employee"},
  type: {
    type: String,
    enum: ["attending", "leaving"]
  },
  day: String,
  createTime: {
    type: Date,
    default: Date.now()
  }

});



module.exports = mongoose.model("History", HistorySchema, "history");