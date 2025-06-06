const Project = require("../../../model/project");
const { v4: uuidv4 } = require('uuid');

const addProject = async (req, res) => {
    const { name, owner } = req.body || {};

    // check for complete and valid payload
    if (!name) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete Project Details, Cannot Proceed"
        });
    };

    try {
        const id = uuidv4();
        const project = new Project({ id, name, owner });
        const savedProject = await project.save();
        if (savedProject) {
            return res.status(201).json({
                status: "success",
                message: "Project successfully created"
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue saving this project to the db. Please contact support"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in creating this project. Please retry"
        });
    }
}

module.exports = addProject;
