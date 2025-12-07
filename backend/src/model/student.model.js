const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    course:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    certificateId:{
        type:String,
        required:true,
        unique:true
    },
    certificateUrl:{
        type:String,
        default:""
    }
},{timestamps:true});

const studenModel = mongoose.model("Data", studentSchema );

module.exports = studenModel;