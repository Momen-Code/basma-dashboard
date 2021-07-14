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

    const { employeeId, password, name, department } = req.body;

    //Validation
    if (!employeeId)
      return res.json({ status: false, message: "يجب كتابة الرقم الوظيفي" });
    if (!password)
      return res.json({ status: false, message: "يجب كتابة كلمة المرور" });
    if (!name)
      return res.json({ status: false, message: "يجب كتابة اسم الموظف" });
    if (!department)
      return res.json({ status: false, message: "يجب كتابة اسم الإدارة" });

    //Check if in DB
    if (await EmployeeModel.findOne({ employeeId }))
      return res.json({
        status: false,
        message: "هذا الرقم الوظيفي مستخدم من قبل",
      });

    //Add to DB
    const savedEmployee = await EmployeeModel.create({
      employeeId,
      password,
      name,
      department,
    });

    if (!savedEmployee)
      return res.json({
        status: false,
        message: "حدث خطأ أثناء اضافة الموظف ، يرجي التواصل مع المطور",
      });

    return res.json({
      status: true,
      message: "تمت اضافة الموظف بنجاح",
      data: { employee: savedEmployee },
    });
  } catch (e) {
    console.log(`Error in /api/employees/add: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
