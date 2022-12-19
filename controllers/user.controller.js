const User = require("../models/user.model");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

exports.loginUser = async function (req, res) {
  console.log("gotcha", req.body);
  try {
    let user = await User.findOne({
      user_name: req.body.user_name,
    });

    if (!user) {
      user = await User.findOne({
        email: req.body.user_name,
      });
      console.log("user", user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      user_name: user.user_name,
      email: user.email,
      token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.createUser = async function (req, res) {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New User created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.signOut = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
