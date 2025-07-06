const express = require("express");
const fileUpload = require("../../middleware/fileUpload");
const router = express.Router();
const options = {
    getFolderName: (req, file) => "blog",
    fieldName: "thumbnail",
    isMultiple: false,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG and PNG files are allowed!"), false);
        }
    }
};

router.get("/", require("../../controller/outbound/blog/retrieveallblog"));
router.post("/:projectId/upload", fileUpload(options), require("../../controller/inbound/blog/uploadblog"));
router.get("/:projectId/:blogId", require("../../controller/inbound/blog/retrieveblog"));
router.patch("/:projectId/:blogId", fileUpload(options), require("../../controller/inbound/blog/updateblog"));
router.delete("/:projectId/:blogId", require("../../controller/inbound/blog/deleteblog"));

module.exports = router;
