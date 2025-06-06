const Gallery = require("../../../model/gallery");

const retrieveGallery = async (req, res) => {
    const { projectId, galleryId } = req.params || {};

    // check for id params
    if (!projectId || !galleryId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Gallery Id not found, Cannot Proceed"
        });
    };

    try {
        const foundGallery = await Gallery.findOne({ id: galleryId, project: projectId, status: "active" });
        if (!foundGallery) {
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

module.exports = retrieveGallery;
