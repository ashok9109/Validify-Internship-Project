const express = require("express");
const { uploadExcelController } = require("../controllers/admin.controller");
const upload = require("../config/multer");


const router = express.Router();

// --------upload-excel---------
router.post("/upload-excel", upload.single("file"),   uploadExcelController);


module.exports = router;


