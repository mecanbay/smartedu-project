const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require('./routes/categoryRoute');
const app = express();

//DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1/smartedu_patika").then(() => {
  console.log("MongoDB Bağlantısı Başarılı...");
});
// TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/category", categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda ayağa kalktı.`);
});
