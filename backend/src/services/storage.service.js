const imageKit = require("imagekit");

const storageInstance = new imageKit({

    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

});

const sendFile = async (file, fileName) => {
    try {

        const response = await storageInstance.upload({
            file,
            fileName,
            folder: "certificates"
        });

        return response
    } catch (error) {
        console.log("error in upoading data in imagekit", error);
    };
};

module.exports = sendFile;