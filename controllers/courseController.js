const Course = require("../models/Course");
const Category = require("../models/Category");


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
    let filter = {}
    if(req.query.categories){
      const category = await Category.findOne({slug : req.query.categories})
      filter = {category:category._id}
    }
    
    // const categorySlug = req.query.categories;

    // if(categorySlug){
    //   const category = Category.findOne({slug : categorySlug});
    // }
    const courses = await Course.find(filter);
    const categories = await Category.find();

    res.render("courses", {
      courses,
      categories,
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
    const categories = await Category.find();

    // res.status(200).json({
    //   status : "success",
    //   course
    // })

    res.render("course", {
      course,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
