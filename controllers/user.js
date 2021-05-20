require("dotenv").config();
const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  
  const { uid, fullname } = req.body;

  User.findOne({ uid }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER does not exists"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    
    //send response to front end
    const { uid, fullName  } = user;
    return res.json({ token, user: { uid, fullName } });
  });
};
