const isValidString = require("../../../helper/isValidString");
const Blog = require("../../../model/blog");

const deleteBlog = async (req, res) => {
    const { projectId, blogId } = req.params || {};

    // check for id params
    if (!blogId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Blog Id not found, Cannot Proceed"
        });
    };

    // check for valid project id
    if (![projectId].every(isValidString)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Project Id, Cannot Proceed"
        });
    };

    try {
        const updatedBlog = await Blog.findOneAndUpdate(
            { id: blogId, project: projectId, status: "active" },
            { $set: { status: "inactive" } },
        );

        if (!updatedBlog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found. Update operation failed."
            });
        };

        return res.status(200).json({
            status: "success",
            message: "Blog successfully deleted.",
            data: updatedBlog
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in deleting blog. Please retry"
        });
    }
};

module.exports = deleteBlog;
