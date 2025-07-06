const Blog = require("../../../model/blog");

const retrieveBlog = async (req, res) => {
    const { projectId, blogId } = req.params || {};

    // check for id params
    if (!projectId || !blogId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Blog Id not found, Cannot Proceed"
        });
    };

    try {
        const foundBlog = await Blog.findOne({ id: blogId, project: projectId, status: "active" });
        if (!foundBlog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found."
            });
        };

        res.status(200).json({
            status: "success",
            message: "successfully retrieved blog",
            data: foundBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving this blog. Please retry"
        });
    }
}

module.exports = retrieveBlog;
