const express = require("express");
const fileUpload = require("../../middleware/fileUpload");
const router = express.Router();
const options = {
	getFolderName: (req, file) => "multimedia",
	fieldName: "image",
	isMultiple: true,
	fileFilter: (req, file, cb) => {
		const allowedTypes = ["image/jpeg", "image/png"];
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Only JPEG and PNG files are allowed!"), false);
		}
	},
};

router.post(
	"/upload",
	fileUpload(options),
	require("../../controller/inbound/multimedia/uploadImage"),
);

module.exports = router;
