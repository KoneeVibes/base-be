const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signInUser = async (req, res) => {
    const { email = undefined, password = undefined } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete User Details, Cannot Proceed"
        });
    };
    try {
        const user = await User.findOne({ email: email, status: "active" });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const timeout = 1440;
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        phone: user.phone,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: `${timeout}m` }
                );
                return res.status(200).json({
                    status: "success",
                    token: accessToken
                });
            } else {
                return res.status(401).json({
                    status: "fail",
                    message: "Incorrect Password"
                });
            }
        } else {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in authenticating this user. Please retry"
        });
    }
};

module.exports = signInUser;
