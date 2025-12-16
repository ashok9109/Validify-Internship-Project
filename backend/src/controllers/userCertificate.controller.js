const userCertificateModel = require("../model/userCertificate.model");
const imageKitSendFile = require("../services/storage.service");

// ---------------------------------
// upload user certificate api
// ---------------------------------
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

// ----------------------------
// user certificate api
// ----------------------------
const getMYCertificateController = async (req, res) => {
    try {

        const userId = req.user._id;

        const certificates = await userCertificateModel.find({ user: userId })
            .select("certificateId certificateUrl  createdAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "certificate fetched successfully",
            success: true,
            count: certificates.length,
            certificates
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "fail to fetch certificates",
            success: false,
            error: error
        });
    };
};


module.exports = { userUploadCertificateController, getMYCertificateController };