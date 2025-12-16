const express = require("express");
const { uploadExcelController, uploadStudentCertificateController, getStudentByCertificateId } = require("../controllers/admin.controller");
const upload = require("../config/multer");


const router = express.Router();

// ------------------
// upload-excel
// ------------------
router.post("/upload-excel", upload.single("file"), uploadExcelController);

// ---------------------------
// upload student certificate
// ----------------------------
router.post("/upload/student-certificate", upload.single("file"), uploadStudentCertificateController);

// -------------------------------------
// get student data by certificate id
// -------------------------------------
router.get("/verify/:certificateId", getStudentByCertificateId)


module.exports = router;


