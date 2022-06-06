const { render } = require("express/lib/response");

exports.viewHomePage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.viewAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.viewRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

