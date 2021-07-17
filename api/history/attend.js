const express = require("express");
const router = express.Router();
const HistoryModel = require("../../models/History.model");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    //Check roles
    console.log(req.user)
    if (req.user.role != "employee")
      return res.json({
        status: false,
        message: "ليس لديك صلاحية الاطلاع علي هذه البيانات",
      });

    const { type } = req.body;

    //Validation
    if (!type || !["attending", "leaving"].includes(type))
      return res.json({
        status: false,
        message: "يجب تحديد نوع العملية سواء حضور أو انصراف",
      });

    //Get the day string --> mm-dd-yyyy
    const date = new Date();
    const day = [
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
      date.getFullYear(),
    ].join("-");

    const savedHistory = await HistoryModel.create({
      employee: mongoose.Types.ObjectId(req.user._id),
      type,
      day,
    });

    if (savedHistory.length == 0)
      return res.json({
        status: false,
        message: "حدث خطأ أثناء حفظ العملية",
      });

    return res.json({
      status: true,
      message: `تم تسجيل عملية ${
        type == "attending" ? "الحضور" : "الانصراف"
      } ينجاح`,
      data: { histroy: savedHistory },
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
