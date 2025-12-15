const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

// -------------auth middleware-------
const authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token is not found "
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(403).json({
                message: "Token is invalid"
            });
        }

        const user = await userModel.findById(decoded.id);

        req.user = user;
        next();

    } catch (error) {
        console.log("error in auth middleware");
        return res.status(500).json({
            message: "Internal server error"
        });
    };
};

module.exports = authMiddleware;