const User = require("../models/User");
const Course = require('../models/Course')
const bcrypt = require("bcrypt");
const Category = require("../models/Category");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/',{
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.redirect("/user/dashboard")
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
}


exports.viewDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID);
  const categories = await Category.find();
  const courses = await Course.find({user : req.session.userID}).sort('-createdAt')
  res.status(200).render('dashboard', {
    page_name : "dashboard",
    user,
    categories,
    courses
  })
}