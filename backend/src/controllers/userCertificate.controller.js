const userCertificateModel = require("../model/userCertificate.model");
const imageKitSendFile = require("../services/storage.service");


const userUploadCertificateController = async (req, res) => {
    try {

        const userId = req.user._id;

        const { certificateId } = req.body;

        if (!certificateId) {
            return res.status(400).json({
                message: "Certificate id is required"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "certificate is required"
            })
        }

        const uplaodCertificate = await imageKitSendFile({
            file: req.file.buffer,
            fileName: `certificate_${certificateId}`,
            folder: "user-certificate"
        });

        const certificate = await userCertificateModel.create({
            user: userId,
            certificateId,
            certificateUrl: uplaodCertificate.url,
        })


        res.status(201).json({
            success: true,
            message: "Certificate uploaded successfully",
            certificate,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    };
};

module.exports = { userUploadCertificateController };