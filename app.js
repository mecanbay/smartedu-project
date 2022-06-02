const express = require("express");
const pageRouter = require("./routes/pageRouter");
const app = express();
const pageController = require("./controllers/pageController");
// TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));

// ROUTES
app.use("/", pageRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda ayağa kalktı.`);
});
