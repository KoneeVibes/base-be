const Gallery = require("../../../model/gallery");
const Project = require("../../../model/project");

const retrieveAllGallery = async (req, res) => {
    const { id } = req.user || {};
    try {
        const projects = await Project.find({ owner: id, status: "active" });
        const projectIds = projects.map(project => project.id);
        const foundGallery = await Gallery.find({ project: { $in: projectIds }, status: "active" }).sort({ createdAt: -1 });
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

module.exports = retrieveAllGallery;
