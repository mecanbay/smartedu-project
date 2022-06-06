const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.route("/").get(pageController.viewHomePage);
router.route("/about").get(pageController.viewAboutPage);

module.exports = router;
