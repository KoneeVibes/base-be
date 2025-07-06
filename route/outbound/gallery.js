const express = require("express");
const router = express.Router();

router.get("/", require("../../controller/outbound/gallery/retrieveallgallery"));
router.get("/:projectId", require("../../controller/outbound/gallery/retrieveallprojectgallery"));

module.exports = router;
