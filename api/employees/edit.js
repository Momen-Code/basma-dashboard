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

    const { _id, employeeId, password, name, department } = req.body;

    //Validation
    if (!_id)
      return res.json({
        status: false,
        message: "يجب اختيار الموظف الذي تريد تعديله",
      });
    if (!employeeId)
      return res.json({ status: false, message: "يجب كتابة الرقم الوظيفي" });
    if (!password)
      return res.json({ status: false, message: "يجب كتابة كلمة المرور" });
    if (!name)
      return res.json({ status: false, message: "يجب كتابة اسم الموظف" });
    if (!department)
      return res.json({ status: false, message: "يجب كتابة اسم الإدارة" });

    //Check if in DB
    if (
      await EmployeeModel.findOne({
        _id: { $ne: _id },
        employeeId,
      })
    )
      return res.json({
        status: false,
        message: "هذا الرقم الوظيفي مستخدم من قبل",
      });

    //Add to DB
    await EmployeeModel.updateOne({
      employeeId,
      password,
      name,
      department,
    });

    const updatedEmployee = await EmployeeModel.findOne({ _id });

    return res.json({
      status: true,
      message: "تم تعديل الموظف بنجاح",
      data: { employee: updatedEmployee },
    });
  } catch (e) {
    console.log(`Error in /api/employees/edit: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
