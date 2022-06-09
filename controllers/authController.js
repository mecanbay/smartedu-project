const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const Category = require("../models/Category");
const { validationResult } = require("express-validator");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.flash("success", "Congr. Account Created.");
    res.status(201).redirect("/");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);

    for (let i =0; i < errors.array().length; i++){
      req.flash("fail", errors.array()[i].msg);
    }

    
    res.status(400).redirect("/");
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
            req.flash("success", "Welcome. :) You are logged in !");
            res.redirect("/user/dashboard");
          }
          else{
            req.flash("fail", "Username or Password is not correct!");
            res.status(400).redirect('/')
          }
        });
      }
      else{
        req.flash("fail", "Username or Password is not correct!");
        res.status(400).redirect('/')
      }
    });
  } catch (error) {
    req.flash("fail", error);
    res.status(400).redirect("/");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.viewDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID).populate("courses");
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID }).sort(
    "-createdAt"
  );
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
  });
};
