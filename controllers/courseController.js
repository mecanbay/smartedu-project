const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.viewCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("courses", {
      courses,
      page_name: "courses",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.viewCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug : req.params.slug});

    // res.status(200).json({
    //   status : "success",
    //   course
    // })

    res.render("course", {
      course,
      page_name: "courses",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
