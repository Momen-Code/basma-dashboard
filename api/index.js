const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/jwt");

router.use("/auth", require("./auth"));
router.use("/settings", checkToken, require("./settings"));
router.use("/history", checkToken, require("./history"));
router.use("/employees", checkToken, require("./employees"));

module.exports = router;
