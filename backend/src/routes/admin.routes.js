const express = require("express");
const { uploadExcelController } = require("../controllers/admin.controller");


const router = express.Router();

// --------upload-excel---------
router.post("/upload-excel", uploadExcelController);


module.exports = router;


