const express = require("express");
const router = express.Router();
const SettingsModel = require("../../models/Settings.model");

router.post("/", async (req, res) => {
  try {
    //Check roles
    if (req.user.role != "admin")
      return res.json({
        status: false,
        message: "ليس لديك صلاحية الاطلاع علي هذه البيانات",
      });

    const {
      lat,
      lng,
      allowedDistance,
      attendanceTime,
      allowedAttendanceTime,
      leavingTime,
      allowedLeavingTime,
    } = req.body;
    if (!lat || !lng)
      return res.json({ status: false, message: "يجب تحديد الموقع" });

    await SettingsModel.updateOne({
      $set: {
        location: { coordinates: [lng, lat] },
        ...(allowedDistance && { allowedDistance }),
        ...(attendanceTime && { attendanceTime }),
        ...(allowedAttendanceTime && { allowedAttendanceTime }),
        ...(leavingTime && { leavingTime }),
        ...(allowedLeavingTime && { allowedLeavingTime }),
      },
    });

    const newSettings = await SettingsModel.findOne({});

    return res.json({
      status: true,
      message: "تم تحديث الاعدادات بنجاح",
      data: { settings: newSettings },
    });
  } catch (e) {
    console.log(`Error in /api/settings/update: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
