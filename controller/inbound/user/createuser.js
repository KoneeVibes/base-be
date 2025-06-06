const User = require("../../../model/user");
const { v4: uuidv4 } = require('uuid');
const isValidString = require("../../../helper/isValidString");

const createUser = async (req, res) => {
    const { firstName, middleName, lastName, email, phone, avatar, project } = req.body || {};

    // check for complete and valid payload
    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete User Details, Cannot Proceed"
        });
    };
    if (![project].every(isValidString)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Project, Cannot Proceed"
        });
    };

    try {
        const id = uuidv4();
        // so we are manually setting password to a value.
        const user = new User({
            id,
            firstName,
            middleName,
            lastName,
            email,
            phone,
            projects: [project],
            password: "Password@123",
            // key is automatically generated
            key: 12345
        });
        const savedUser = await user.save();
        if (savedUser) {
            return res.status(201).json({
                status: "success",
                message: "User successfully created"
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue saving this user to the db. Please contact support"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in creating this user. Please retry"
        });
    }
}


module.exports = createUser;
