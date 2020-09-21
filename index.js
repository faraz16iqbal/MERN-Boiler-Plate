const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

app.post("/api/users/register", (req, res) => {
  console.log(User);
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
      userData: user,
    });
  });
});
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.listen(5000);
