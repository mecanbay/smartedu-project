const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');

router.route("/register").post(authController.createUser);
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)


module.exports = router;