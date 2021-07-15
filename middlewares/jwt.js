require("dotenv/config");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const EmployeeModel = require("../models/Employee.model");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "randomaccesstoken";

module.exports = {
  createToken: async (payload) => {
    try {
      const token = await jwt.sign(payload, ACCESS_TOKEN);
      return token;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  checkToken: async (req, res, next) => {
    try {
      const token =
        (req.headers["authorization"] &&
          req.headers["authorization"].split(" ")[1]) ||
        req.cookies["access_token"];

      if (!token) {
        return res.json({
          status: false,
          message: "You don't have access to these information",
        });
      }

      const user = await jwt.verify(token, ACCESS_TOKEN);

      let searchUser;
      //check DB existence
      if (user.role == "admin")
        searchUser = await UserModel.findOne({ _id: user._id });
      else if (user.role == "employee")
        searchUser = await EmployeeModel.findOne({ _id: user._id });

      if (searchUser) {
        req.user = { ...searchUser, role: user.role };
        return next();
      } else {
        return res.json({
          status: false,
          message: "You don't have access to these information",
        });
      }
    } catch (e) {
      console.log(e);
      return next();
    }
  },
};
