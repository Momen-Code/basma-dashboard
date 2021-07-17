const express = require("express");
const router = express.Router();
const EmployeeModel = require("../../models/Employee.model");

router.post("/", async (req, res) => {
  try {
    //Check roles
    if (req.user.role != "admin")
      return res.json({
        status: false,
        message: "ليس لديك صلاحية الاطلاع علي هذه البيانات",
      });

    //Filters
    const { department, employeeId, paginationToken, limit = 10 } = req.body;

    console.log(req.body);
    const employees = await EmployeeModel.find({
      ...(department && { department: { $regex: ".*" + department + ".*" } }),
      ...(employeeId && { employeeId: { $regex: ".*" + employeeId + ".*" } }),
      ...(paginationToken && { _id: { $gt: paginationToken } }),
    }).limit(limit);

    console.log(employees);
    if (employees.length == 0)
      return res.json({ status: false, message: "لا يوجد موظفين حاليا" });

    return res.json({
      status: true,
      message: "تم استرجاع البيانات بنجاح",
      data: { employees },
    });
  } catch (e) {
    console.log(`Error in /api/employees/get: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
