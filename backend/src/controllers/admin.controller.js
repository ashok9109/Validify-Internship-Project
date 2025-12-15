const XLSX = require("xlsx");
const studentModel = require("../model/student.model");
const imageKitSendFile = require("../services/storage.service");


// -----------upload Excel controller-------------
const uploadExcelController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Excel file is requireds'
            })
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet);

        if (!rows.length) {
            return res.status(400).json({
                message: "excel file  is empty"
            })
        }

        const operations = rows.map((row) => {
            const {
                fullName,
                email,
                course,
                duration,
                certificateId,
            } = row;

            if (!fullName || !email || !course || !duration || !certificateId) {
                return null
            }

            return studentModel.updateOne(
                { certificateId },
                {
                    $set: {
                        fullName,
                        email,
                        course,
                        duration,
                    }
                },
                { upsert: true }
            )
        }).filter(Boolean);

        await Promise.all(operations);

        return res.status(200).json({
            message: "student data is saved successfully",
            count: operations.length
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error "
        });
    };
};


// ------uplaod student controller-------------

const uploadStudentCertificateController = async (req, res) => {
    try {

        const { certificateId } = req.body;

        if (!certificateId) {
            return res.status(400).json({
                message: "Certificate is required"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Certificate is required"
            })
        }

        const uploadCertificate = await imageKitSendFile({
            file: req.file.buffer,
            fileName: `certificate_${certificateId}`,
            folder: "certificates"
        });

        const url = uploadCertificate.url;

        const student = await studentModel.findOneAndUpdate(
            { certificateId },
            { certificateUrl: url },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "student is not found"
            })
        }

        return res.status(200).json({
            message: "certificate upload successfully",
            student
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    };
};

module.exports = { uploadExcelController, uploadStudentCertificateController };

