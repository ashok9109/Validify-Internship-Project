const mongoose = require("mongoose");

const userCertificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    certificateId: {
        type: String,
        required: true
    },
    certificateUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ["pdf", "image"],
        required: true
    }
}, { timestamps: true })

const userCertificateModel = mongoose.model("User-certificate", userCertificateSchema);

module.exports = userCertificateModel;