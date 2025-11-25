const mongoose = require("mongoose");

const connectDb = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGOOSE_URI)
        if(res){
            console.log("MongoDB is connected successfully");
        }
        
    } catch (error) {
        console.log("Error in connecting mongoDb", error);
    };
};

module.exports = connectDb;