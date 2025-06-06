const Gallery = require("../../../model/gallery");

const deleteGallery = async (req, res) => {
    const { projectId, galleryId } = req.params || {};

    // check for id params
    if (!projectId || !galleryId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Gallery Id not found, Cannot Proceed"
        });
    };

    try {
        const updatedGallery = await Gallery.findOneAndUpdate(
            { id: galleryId, project: projectId, status: "active" },
            { $set: { status: "inactive" } },
        );

        if (!updatedGallery) {
            return res.status(404).json({
                status: "fail",
                message: "Gallery not found. Update operation failed."
            });
        };

        return res.status(200).json({
            status: "success",
            message: "Gallery successfully deleted.",
            data: updatedGallery
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in deleting gallery. Please retry"
        });
    }
};

module.exports = deleteGallery;
