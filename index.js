const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://faraz16iqbal:munifafa@cluster1.dhlct.mongodb.net/test1?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000);
