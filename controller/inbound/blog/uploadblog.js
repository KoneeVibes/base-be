const { v4: uuidv4 } = require('uuid');
const Blog = require("../../../model/blog");
const Project = require("../../../model/project");
const isValidString = require('../../../helper/isValidString');

const uploadBlog = async (req, res) => {
    const file = req.file || {};
    const { projectId } = req.params || {};
    const { title, body } = req.body || {};
    const thumbnail = file?.path;

    // check for valid project id
    if (![projectId].every(isValidString)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Project Id, Cannot Proceed"
        });
    };

    // check if any file was uploaded
    if (!file || !file.path) {
        return res.status(400).json({
            status: "fail",
            message: "No thumbnail uploaded.",
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

        const id = uuidv4();
        const blog = new Blog({
            id,
            project: projectId,
            title,
            body,
            thumbnail
        });
        const savedBlog = await blog.save();
        if (savedBlog) {
            return res.status(201).json({
                status: "success",
                message: "Blog successfully uploaded"
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue uploading this blog. Please contact support"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in uploading blog. Please retry"
        });
    }
};

module.exports = uploadBlog;
