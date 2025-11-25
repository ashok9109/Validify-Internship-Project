const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// -----------Resgister-api--------------
router.post("/register", registerController);

// -----------Login-api---------------
router.post("/login", loginController);

// -----------logout-api----------
router.get("/logout",authMiddleware, logoutController);



module.exports = router;