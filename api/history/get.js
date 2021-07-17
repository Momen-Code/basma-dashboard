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

    const {
      _id,
      employeeId,
      department,
      day,
      paginationToken,
      limit = 10,
    } = req.body;

    console.log(req.body);

    let history = await HistoryModel.find({
      ...(_id && { _id }),
      ...(day && { day: { $regex: ".*" + day + ".*" } }),

      ...(paginationToken && { _id: { $gt: paginationToken } }),
    }).populate({
      path: "employee",
      match: {
        ...(department && {
          department: { $regex: ".*" + department + ".*" },
        }),
        ...(employeeId && {
          employeeId: { $regex: ".*" + employeeId + ".*" },
        }),
      },
    });

    history = history.filter((item) => item.employee);
    console.log("testing ", history);

    if (history.length == 0)
      return res.json({
        status: false,
        message: "لا يوجد أي سجلات في هذا اليوم",
      });

    return res.json({
      status: true,
      message: "تم استرجاع البيانات بنجاح",
      data: { history },
    });
  } catch (e) {
    console.log(`Error in /api/history/get: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
