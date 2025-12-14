const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlenght: 10
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;