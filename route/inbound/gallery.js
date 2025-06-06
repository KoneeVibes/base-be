const express = require("express");
const fileUpload = require("../../middleware/fileUpload");
const router = express.Router();
const options = {
    getFolderName: (req, file) => "gallery",
    fieldName: "img",
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG and PNG files are allowed!"), false);
        }
    }
};

router.get("/", require("../../controller/outbound/gallery/retrieveallgallery"));
router.post("/:projectId/upload", fileUpload(options), require("../../controller/inbound/gallery/uploadgallery"));
router.get("/:projectId/:galleryId", require("../../controller/inbound/gallery/retrievegallery"));
router.patch("/:projectId/:galleryId", fileUpload(options), require("../../controller/inbound/gallery/updategallery"));
router.delete("/:projectId/:galleryId", require("../../controller/inbound/gallery/deletegallery"));

module.exports = router;
