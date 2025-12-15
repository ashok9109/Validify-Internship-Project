const express = require("express");
const { userUploadCertificateController, getMYCertificateController } = require("../controllers/userCertificate.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer");


const router = express.Router();

// ------------upload user certificate api-----------
router.post("/upload-certificate", authMiddleware , upload.single("file") , userUploadCertificateController);

// -----------fetch user certificates api---------
router.get("/get/my-certificates", authMiddleware , getMYCertificateController);


module.exports = router;