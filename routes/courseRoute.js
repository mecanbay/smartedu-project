const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.route("/").get(courseController.viewCourses);
router.route("/").post(roleMiddleware(["teacher", "admin"]), courseController.createCourse);
router.route("/:slug").get(courseController.viewCourse);
router.route("/enroll/:slug").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse)
module.exports = router;
