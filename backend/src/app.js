const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieparser = require("cookie-parser");

const app = express();

app.use(cookieparser());
app.use(express.json());


//--------user api-----------
app.use("/api/user", userRouter);

module.exports = app;