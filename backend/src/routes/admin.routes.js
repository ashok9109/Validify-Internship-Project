const express = require("express");
const { uploadExcelController, uploadStudentCertificateController } = require("../controllers/admin.controller");
const upload = require("../config/multer");


const router = express.Router();

// --------upload-excel---------
router.post("/upload-excel", upload.single("file"),   uploadExcelController);

// --------upload student certificate----
router.post("/upload/student-certificate", upload.single("file"), uploadStudentCertificateController);


module.exports = router;


