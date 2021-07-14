const express = require("express");
const router = express.Router();


router.use("/get", require("./get"));
router.use("/update", require("./update"));

module.exports = router;
