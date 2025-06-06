const express = require("express");
const router = express.Router();
const { signOutUser } = require("../../controller/inbound/authentication/signout");

router.post("/signin", require("../../controller/inbound/authentication/signin"));
router.post("/signout", require("../../middleware/authorization"), signOutUser);

module.exports = router;
