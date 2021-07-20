const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getDistance } = require("geolib");
const HistoryModel = require("../../models/History.model");
const SettingsModel = require("../../models/Settings.model");

router.post("/", async (req, res) => {
  try {
    //Check roles
    if (req.user.role != "employee")
      return res.json({
        status: false,
        message: "ليس لديك صلاحية الاطلاع علي هذه البيانات",
      });

    const { type, lat, lng } = req.body;

    //Validation
    if (!type || !["attending", "leaving"].includes(type))
      return res.json({
        status: false,
        message: "يجب تحديد نوع العملية سواء حضور أو انصراف",
      });

    if (!lat || !lng)
      return res.json({
        status: false,
        message: "هناك مشكلة في تحديد موقعك ، يرجي التأكد من أن الموقع مفعل",
      });

    /*****************************************/
    //Check if settings is OK
    const settings = await SettingsModel.findOne({}).lean();

    //Check distance
    const distance = getDistance(
      { longitude: lng, latitude: lat },
      {
        longitude: settings.location.coordinates[0],
        latitude: settings.location.coordinates[1],
      }
    );

    if (distance > settings.allowedDistance) {
      return res.json({
        status: false,
        message: `يبدو انك تحاول تسجيل  ${
          type == "attending" ? "الحضور" : "الانصراف"
        } من مكان بعيد عن المؤسسة ، يرجي التسجيل من داخل المؤسسة فقط`,
      });
    }

    const date = new Date();
    //Get the day string --> mm-dd-yyyy
    const day = [
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
      date.getFullYear(),
    ].join("-");

    const timeInHours = date.getHours() + date.getMinutes() / 60;

    //Check if he already registered today
    const searchHistory = await HistoryModel.findOne({
      employee: mongoose.Types.ObjectId(req.user._id),
      day,
      type,
    }).lean();


    if (searchHistory)
      return res.json({
        status: false,
        message: `لقد قمت بتسجيل ${
          type == "attending" ? "الحضور" : "الانصراف"
        } اليوم بالفعل`,
      });

    if (type == "attending") {
      if (
        timeInHours - settings.attendanceTime >
        settings.allowedAttendanceTime
      ) {
        return res.json({
          status: false,
          message: `يبدو أنك تخطيت الوقت المحدد لتسجيل الحضور`,
        });
      }
      if (timeInHours < settings.attendanceTime) {
        return res.json({
          status: false,
          message: "لم يحن موعد تسجيل الحضور بعد",
        });
      }
    } else {
      if (timeInHours - settings.leavingTime > settings.allowedLeavingTime) {
        return res.json({
          status: false,
          message: `يبدو أنك تخطيت الوقت المحدد لتسجيل الانصراف`,
        });
      }
      if (timeInHours < settings.leavingTime) {
        return res.json({
          status: false,
          message: "لم يحن موعد تسجيل الانصراف بعد",
        });
      }
    }
    /*****************************************/

    const savedHistory = await HistoryModel.create({
      employee: mongoose.Types.ObjectId(req.user._id),
      type,
      day,
      location: {
        coordinates: [lng, lat],
      },
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
