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

    const settings = await SettingsModel.findOne({});

    if (!settings)
      await SettingsModel.create({
        location: { coordinates: [39.252349, 21.476755] },
      });

    if (!settings.location)
      await SettingsModel.updateOne({
        $set: {
          location: { coordinates: [39.252349, 21.476755] },
        },
      });

    return res.json({
      status: true,
      message: "تم استرجاع البيانات بنجاح",
      data: { settings },
    });
  } catch (e) {
    console.log(`Error in /api/settings/get: ${e.message}`, e);

    if (!res.headersSent) {
      res.json({
        status: false,
        message: "حدث خطأ ما ،يرجي اعادة المحاولة مرة أخري",
      });
    }
  }
});

module.exports = router;
