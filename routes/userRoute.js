const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const registerValidation = require("../middlewares/validation/registerValidation");
const loginValidation = require("../middlewares/validation/loginValidation");

router.route("/register").post(registerValidation, authController.createUser);
router.route("/login").post(loginValidation,authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/:userId").delete(authController.deleteUser);
router
  .route("/dashboard")
  .get(authMiddleware, authController.viewDashboardPage);

module.exports = router;
