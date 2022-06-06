const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.route("/").get(courseController.viewCourses);
router.route("/").post(courseController.createCourse);
router.route("/:slug").get(courseController.viewCourse);

module.exports = router;