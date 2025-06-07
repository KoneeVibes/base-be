const { v4: uuidv4 } = require('uuid');
const Gallery = require("../../../model/gallery");
const Project = require("../../../model/project");

const uploadGallery = async (req, res) => {
    const files = req.files || [];
    const { projectId } = req.params || {};
    const { titles, descriptions } = req.body || {};
    const imagesData = [];

    // check for project id
    if (!projectId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id not found, Cannot Proceed"
        });
    };

    // check is any files were uploaded
    if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
            status: "fail",
            message: "No images uploaded.",
        });
    }

    // populate the imagesData array in proper format
    files.forEach((file, index) => {
        const title = Array.isArray(titles) ? titles[index] : titles;
        const description = Array.isArray(descriptions) ? descriptions[index] : descriptions;
        imagesData.push({
            id: uuidv4(),
            url: file.path,
            title,
            description
        });
    });

    try {
        const project = await Project.findOne({ id: projectId, status: "active" });
        if (!project) {
            return res.status(404).json({
                status: "fail",
                message: "Project not found. Cannot proceed"
            });
        };

        const savedGallery = await Gallery.insertMany(imagesData.map(img => ({
            ...img,
            project: projectId
        })));
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
