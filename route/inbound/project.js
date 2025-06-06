const express = require("express");
const router = express.Router();

router.post("/addproject", require("../../controller/inbound/project/addproject"));

module.exports = router;
