const express = require("express");
const router = express.Router();



router.use("/get", require("./get"))
router.use("/attend", require("./attend"))

module.exports = router;
