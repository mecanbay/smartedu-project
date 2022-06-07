const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// ROUTES
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

//ENV
const port = 3000;
const mongodb = "mongodb://127.0.0.1/smartedu_patika";

//GLOBAL VARIABLE
global.userIn = null;

//DATABASE CONNECTION
mongoose.connect(mongodb).then(() => {
  console.log("MongoDB Bağlantısı Başarılı...");
});
// TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "root@nodejs",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongodb }),
  })
);


app.use("*", (req, res, next) => {
  userIn = req.session.userID;
  next();
});

// ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda ayağa kalktı.`);
});
