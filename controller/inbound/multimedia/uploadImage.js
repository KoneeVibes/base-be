const uploadImage = async (req, res) => {
	const files = Array.isArray(req.files)
		? req.files.map((file) => file.path)
		: [];

	if (files.length === 0) {
		return res.status(400).json({
			status: "fail",
			message: "No images uploaded.",
		});
	}

	return res.status(201).json({
		status: "success",
		data: files,
		message: "Successfully saved to gallery.",
	});
};

module.exports = uploadImage;
