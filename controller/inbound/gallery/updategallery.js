const { v2: cloudinary } = require("cloudinary");
const Gallery = require("../../../model/gallery");

const updateGallery = async (req, res) => {
    const { path } = req.file || {};
    const { projectId, galleryId } = req.params || {};
    const { title, description } = req.body || {};

    // check for id params
    if (!projectId || !galleryId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Gallery Id not found, Contact Support"
        });
    };
    // check for complete payload
    if (!title || !description) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete Gallery Details, Cannot Proceed"
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
        const oldUrl = foundGallery?.url;

        const updatedGallery = await Gallery.findOneAndUpdate(
            { id: galleryId, project: projectId, status: "active" },
            { $set: { url: path, title, description } },
        );
        if (!updatedGallery) {
            return res.status(404).json({
                status: "fail",
                message: "Gallery not found. Update operation failed."
            });
        };

        if (path && oldUrl) {
            const oldId = oldUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`gallery/${oldId}`);
        };

        return res.status(200).json({
            status: "success",
            message: "Gallery successfully updated.",
            data: updatedGallery
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in updating gallery. Please retry"
        });
    }
};

module.exports = updateGallery;
