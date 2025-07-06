const Blog = require("../../../model/blog");

const retrieveAllProjectBlog = async (req, res) => {
    const { projectId } = req.params || {};
    try {
        const foundBlogs = await Blog.find({ project: projectId, status: "active" }).sort({ createdAt: -1 });
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

module.exports = retrieveAllProjectBlog;
