const express = require("express");
const router = express.Router();

router.get("/", require("../../controller/outbound/gallery/retrieveallgallery"));

module.exports = router;
