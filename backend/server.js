require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/db/db");



connectDb();
app.listen(process.env.PORT, ()=>{
    console.log("server is runing port 3000");
})