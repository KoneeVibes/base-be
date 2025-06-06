const { v4: uuidv4 } = require('uuid');
const Gallery = require("../../../model/gallery");
const Project = require("../../../model/project");

const uploadGallery = async (req, res) => {
    const { path } = req.file || {};
    const { projectId } = req.params || {};
    const { title, description } = req.body || {};
    // check for project id
    if (!projectId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id not found, Cannot Proceed"
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
        const project = await Project.findOne({ id: projectId, status: "active" });
        if (!project) {
            return res.status(404).json({
                status: "fail",
                message: "Project not found. Cannot proceed"
            });
        };

        const gallery = new Gallery({
            id: uuidv4(),
            project: projectId,
            title,
            description,
            url: path
        });
        const savedGallery = await gallery.save();
        if (savedGallery) {
            return res.status(201).json({
                status: "success",
                message: "Successfully saved to gallery."
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue saving this entry to the db. Please contact support"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in saving to gallery. Please retry"
        });
    }
};

module.exports = uploadGallery;
