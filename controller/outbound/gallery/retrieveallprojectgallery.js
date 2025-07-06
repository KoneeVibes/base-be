const Gallery = require("../../../model/gallery");

const retrieveAllProjectGallery = async (req, res) => {
    const { projectId } = req.params || {};
    try {
        const foundGallery = await Gallery.find({ project: projectId, status: "active" }).sort({ createdAt: -1 });
        if (!foundGallery || foundGallery.length <= 0) {
            return res.status(404).json({
                status: "fail",
                message: "Gallery not found."
            });
        };

        res.status(200).json({
            status: "success",
            message: "successfully retrieved gallery",
            data: foundGallery
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving this gallery. Please retry"
        });
    }
}

module.exports = retrieveAllProjectGallery;
