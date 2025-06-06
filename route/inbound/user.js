const express = require("express");
const router = express.Router();

router.post("/createuser", require("../../controller/inbound/user/createuser"));
router.get("/retrieveloggedinuser", require("../../controller/inbound/user/retrieveloggedinuser"));

module.exports = router;
