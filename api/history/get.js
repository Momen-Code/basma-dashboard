const express = require("express");
const router = express.Router();
const HistoryModel = require("../../models/History.model");


router.post("/", async (req, res) => {
  try {
    //Check roles
    if (req.user.role != "admin")
      return res.json({
        status: false,
        message: "ليس لديك صلاحية الاطلاع علي هذه البيانات",
      });

    const { _id, employeeId, department, day } = req.body;

    const histroy = await HistoryModel.find({
      ...(_id && { _id }),
      ...(employeeId && { employeeId }),
      ...(department && { department }),
      ...(day && { day }),
    });

    if (histroy.length == 0)
      return res.json({
        status: false,
        message: "لا يوجد أي سجلات في هذا اليوم",
      });

    return res.json({
      status: true,
      message: "تم استرجاع البيانات بنجاح",
      data: { histroy },
    });
  } catch (e) {
    console.log(`Error in /api/histroy/get: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
