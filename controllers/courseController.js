const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { use } = require("bcrypt/promises");
const session = require("express-session");

exports.createCourse = async (req, res) => {
  try {
    req.body["user"] = req.session.userID;
    const course = await Course.create(req.body);

    req.flash("success", "NGINX CONFIGRATION");
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("fail", error);
    res.status(400).redirect("/courses");
  }
};

exports.viewCourses = async (req, res) => {
  try {
    let filter = {};
    let xss = {};
    const categorySlug = req.query.categories;
    const query = req.query.search;

    if (categorySlug) {
      const category = await Category.findOne({ slug: req.query.categories });
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
      xss = { query: req.query.search };
    }

    if (!query && !categorySlug) {
      (filter.name = ""), (filter.category = null);
    }
    // const categorySlug = req.query.categories;

    // if(categorySlug){
    //   const category = Category.findOne({slug : categorySlug});
    // }
    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");
    const categories = await Category.find();

    res.render("courses", {
      courses,
      categories,
      page_name: "courses",
      xss,
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find();

    // res.status(200).json({
    //   status : "success",
    //   course
    // })

    res.render("course", {
      course,
      categories,
      page_name: "courses",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: course._id });
    await user.save();
    req.flash("success", "Your course enrolled successfuly.");
    res.status(200).redirect("/user/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    req.flash("success", "Your course released successfuly.");
    res.status(200).redirect("/user/dashboard");
  } catch (error) {
    res.send(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash("success", "Your Course deleted successfuly");
    res.status(201).redirect("/user/dashboard");
  } catch (error) {
    req.flash("fail", "Failed");
    res.status(400).redirect("/user/dashboard");
  }
};
