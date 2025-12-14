const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const adminRouter = require("./routes/admin.routes");
const userCertificateRouter = require("./routes/userCertificate.routes");


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieparser());
app.use(express.json());


//--------user api-----------
app.use("/api/user", userRouter);

// --------admin api--------
app.use("/api/admin", adminRouter);

// --user certificate upload and fetching api---
app.use("/api/user", userCertificateRouter);

module.exports = app;