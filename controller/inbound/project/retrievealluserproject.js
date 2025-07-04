const Project = require("../../../model/project");

const retrieveAllUserProject = async (req, res) => {
    const { id } = req.user || {};
    const { userId } = req.params || {};

    if (userId !== id) {
        return res.status(400).json({
            status: "fail",
            message: "Unauthorized, Can only retrieve authorized projects."
        });
    };

    try {
        const projects = await Project.find({ owner: id, status: "active" });
        if (!projects || projects.length <= 0) {
            return res.status(404).json({
                status: "fail",
                message: "Projects not found."
            });
        };

        res.status(200).json({
            status: "success",
            message: "successfully retrieved all user projects",
            data: projects
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving all user projects. Please retry"
        });
    }
}

module.exports = retrieveAllUserProject;
