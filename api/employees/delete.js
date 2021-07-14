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

    const { _id } = req.body;

    if (!_id)
      return res.json({
        status: false,
        message: "يجب اختيار الموظف الذي تريد حذفه",
      });

    await EmployeeModel.deleteOne({ _id });

    return res.json({ status: true, message: "تم حذف الموظف بنجاح" });
  } catch (e) {
    console.log(`Error in /api/employees/delete: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
