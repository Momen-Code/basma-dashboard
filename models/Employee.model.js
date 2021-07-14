const mongoose = require("mongoose");



const EmployeeSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  department: String,
  createTime: {
    type: Date,
    default: Date.now()
  }

});



module.exports = mongoose.model("Employee", EmployeeSchema, "employees");