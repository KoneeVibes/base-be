const Blog = require("../../../model/blog");
const Project = require("../../../model/project");

const retrieveAllBlog = async (req, res) => {
    const { id } = req.user || {};
    try {
        const projects = await Project.find({ owner: id, status: "active" });
        const projectIds = projects.map(project => project.id);
        const foundBlogs = await Blog.find({ project: { $in: projectIds }, status: "active" }).sort({ createdAt: -1 });
        if (!foundBlogs || foundBlogs.length <= 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog(s) not found."
            });
        };

        res.status(200).json({
            status: "success",
            message: "successfully retrieved blog(s)",
            data: foundBlogs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving blog(s). Please retry"
        });
    }
}

module.exports = retrieveAllBlog;
