const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieparser());
app.use(express.json());


//--------user api-----------
app.use("/api/user", userRouter);

module.exports = app;