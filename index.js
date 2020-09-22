const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");

const config = require("./config/key");
const { User } = require("./models/users");
const { auth } = require("./middleware/auth");

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

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

app.post("/api/users/register", (req, res) => {
  console.log(User);
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
      userData: doc,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //find email

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "Auth failed, email not found",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSucess: false,
          message: "Wrong password entered!",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          loginSucess: true,
        });
      });
    });
  });
});

app.listen(5000);
