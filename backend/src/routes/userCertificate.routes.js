const express = require("express");
const { userUploadCertificateController } = require("../controllers/userCertificate.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer");


const router = express.Router();

router.post("/upload-certificate", authMiddleware , upload.single("file") , userUploadCertificateController);


module.exports = router;