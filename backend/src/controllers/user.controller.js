const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//----------------------------
// Resgister Controller
// ---------------------------
const registerController = async (req, res) => {
    try {
        const { fullName, mobile, email, password, username } = req.body;

        if (!fullName || !mobile || !email || !password) {
            res.status(422).json({
                message: "all Fields are required"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, { mobile }]
        })

        if (existingUser) {
            return res.status(409).json({
                message: "User is already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            username,
            mobile,
            email,
            password: hash
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        });

        return res.status(201).json({
            message: "User is register successfully",
            newUser: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    };
};

//---------------------------
// Login Controller
// --------------------------
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                message: "All fields is required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "user is not found"
            });
        }

        const decrypt = await bcrypt.compare(password, user.password);

        if (!decrypt) {
            return res.status(401).json({
                message: "Invalid credenctails"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        });

        return res.status(200).json({
            message: "user loggedIn successfully",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,

            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal sever error",
            error: error
        });
    };
};

// -----------------------------
// Logout-Controller
// -----------------------------
const logoutController = async (req, res) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(404).json({
                message: "Token is not found"
            });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successfully"
        })

    } catch (error) {
        console.log("error in logout ", error)
        return res.status(500).json({
            message: "Internal sever error",
            error: error
        });
    };
};

// --------------------------
// Change password api
// --------------------------
const changePasswordController = async (req, res) => {
    try {

        const userId = req.user._id;

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "user is not found"
            })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            })
        }

        const hash = await bcrypt.hash(newPassword, 10);

        user.password = hash;

        await user.save();

        return res.status(200).json({
            message: "password is changed successfully",
            success: true
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

module.exports = { registerController, loginController, logoutController, changePasswordController };