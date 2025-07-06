const express = require("express");
const router = express.Router();

router.get("/", require("../../controller/outbound/blog/retrieveallblog"));
router.get("/:projectId", require("../../controller/outbound/blog/retrieveallprojectblog"));

module.exports = router;
