const express = require("express");
const { registerController, loginController, logoutController, changePasswordController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// ------------------------
// fetching current user
// -------------------------
router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "user is loggedin",
        user: req.user,
    })
})

// ----------------------
// Resgister api
// ----------------------
router.post("/register", registerController);

// ------------------
// Login api
// ------------------
router.post("/login", loginController);

// ----------------
// logout api
// -----------------
router.get("/logout", authMiddleware, logoutController);

// ----------------------
// change password api
// -----------------------
router.post("/change-password", authMiddleware, changePasswordController);


module.exports = router;