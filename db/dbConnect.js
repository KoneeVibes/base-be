const mongoose = require("mongoose");
require('dotenv').config();

function dBConnect() {
    const dBConnection = mongoose.createConnection(
        process.env.CONNECTION_STRING,
    );

    dBConnection.on("connected", () => {
        console.log("Successfully connected to the application database");
    });

    dBConnection.on("error", (err) => {
        console.log("Unable to connect to the application database");
        console.error(err);
    });

    return dBConnection;
}

module.exports = dBConnect();
