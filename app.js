const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(201).send('<h1>Index<h2>');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda ayağa kalktı.`);
});
