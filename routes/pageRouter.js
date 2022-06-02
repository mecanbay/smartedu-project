const express = require("express");
const pageController = require("../controllers/pageController");
const router = express.Router();

router.route("/").get(pageController.viewHomePage);
router.route("/about").get(pageController.viewAboutPage);

module.exports = router;
