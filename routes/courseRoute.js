const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const roleMiddleware = require('../middlewares/roleMiddleware')

router.route("/").get(courseController.viewCourses);
router.route("/").post(roleMiddleware(["teacher", "admin"]) ,courseController.createCourse);
router.route("/:slug").get(courseController.viewCourse);
router.route("/:slug").post(courseController.enrollCourse)

module.exports = router;