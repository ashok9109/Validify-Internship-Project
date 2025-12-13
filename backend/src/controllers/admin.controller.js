const XLSX = require("xlsx");
const studenModel = require("../model/student.model");


// upload Excel controller
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

            return studenModel.updateOne(
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
            message:"student data is saved successfully",
            count:operations.length
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error "
        })
    }
};

module.exports = { uploadExcelController };

