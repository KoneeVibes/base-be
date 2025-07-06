const { v2: cloudinary } = require("cloudinary");
const Blog = require("../../../model/blog");
const isValidString = require("../../../helper/isValidString");

const updateBlog = async (req, res) => {
    const file = req.file || {};
    const { projectId, blogId } = req.params || {};
    const { title, body } = req.body || {};
    const thumbnail = file?.path;

    // check for project and blog id
    if (!blogId) {
        return res.status(400).json({
            status: "fail",
            message: "Blog Id not found. Contact Support.",
        });
    };

    // check for valid project id
    if (![projectId].every(isValidString)) {
        return res.status(404).json({
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
        const foundBlog = await Blog.findOne({
            id: blogId,
            project: projectId,
            status: "active",
        });

        if (!foundBlog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found.",
            });
        };

        const oldThumbnail = foundBlog?.thumbnail;
        const updatedBlog = await Blog.findOneAndUpdate(
            { id: blogId, project: projectId, status: "active" },
            { $set: { title, body, thumbnail } },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                status: "success",
                message: "Blog not found"
            })
        };

        if (thumbnail && oldThumbnail) {
            const oldThumbnailId = oldThumbnail.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`blog/${oldThumbnailId}`);
        };

        return res.status(200).json({
            status: "success",
            message: "Blog update operation completed.",
            data: updatedBlog,
        });
    } catch (error) {
        console.error("Update Blog Error:", error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue updating this blog. Please retry.",
        });
    }
};

module.exports = updateBlog;
