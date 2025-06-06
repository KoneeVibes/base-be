const jwt = require('jsonwebtoken');
const User = require("../model/user");
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({
            status: "fail",
            message: 'Authorization header missing'
        });
        const APIKEY = authHeader.split(' ')[1];
        const authType = authHeader.split(' ')[0];
        if (!APIKEY || authType !== "APIKey") return res.status(404).json({
            status: "fail",
            message: "API key is missing in authorization header or wrongly configured"
        });
        let decodedToken;
        try {
            decodedToken = { id: APIKEY };
        } catch (err) {
            return res.status(401).json({
                status: "fail",
                message: 'Invalid API Key'
            });
        };
        const user = await User.findOne({ key: decodedToken.id });
        if (!user) return res.status(404).json({
            status: "fail",
            message: 'User not found'
        });
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an error. Contact Administrator"
        })
    }
};
