const mongoose = require("mongoose");
const appDB = require("../db/dbConnect");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const projectSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "inactive"]
    },
}, { timestamps: true });

module.exports = appDB.model("Project", projectSchema);
