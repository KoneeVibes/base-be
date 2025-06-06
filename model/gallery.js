const mongoose = require("mongoose");
const appDB = require("../db/dbConnect");
const { Schema } = mongoose;

const gallerySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    project: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "inactive"]
    },
}, { timestamps: true });

module.exports = appDB.model("Gallery", gallerySchema);
