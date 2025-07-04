const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/all", require("../../controller/inbound/project/retrievealluserproject"));
router.post("/addproject", require("../../controller/inbound/project/addproject"));

module.exports = router;
