const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.route("/").get(pageController.viewHomePage);
router.route("/about").get(pageController.viewAboutPage);
router.route("/contact").get(pageController.viewContactPage);
router.route("/contact").post(pageController.sendEmail);
module.exports = router;
