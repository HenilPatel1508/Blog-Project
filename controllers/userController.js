const sendData = require("../config/mailer");
const { FogetFormat } = require("../util/forgetpass");
const User = require("../models/userModel");
const { hashpassword, matchpassword } = require("../util/hashpassword");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, emailid, mobile, password } = req.body;
  const hashpass = await hashpassword(password);
  const user = await User.create({
    name,
    emailid,
    mobile,
    password: hashpass,
  });
  if (user) {
    // res.json("thanks you for registration");
    res.redirect("/signin");
  } else {
    res.json("Something Wrong");
  }
};

exports.signin = async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const admin = await User.findOne({ emailid: emailid });
    if (!admin) {
      res.json("user not found");
    }
    const Ismatch = await matchpassword(password, admin.password);
    if (!Ismatch) {
      res.status(400).json({
        success: false,
        message: "Invalid Crediantial...",
      });
    } else {
      const token = jwt.sign(
        {
          adminid: admin._id,
          adminrole: admin.role_id,
        },
        "henil1508",
        { expiresIn: "24h" }
      );

      res.cookie("token", token, { httpOnly: true });
      res.cookie("admin", admin, { httpOnly: true }).redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sendMailForgat = async (req, res) => {
  const { emailid } = req.body;
  const existUser = await User.findOne({ emailid: emailid });
  if (!existUser) {
    res.json("email id is not exist");
  }
  console.log(existUser);
  console.log(emailid);

  const link = `${process.env.WEBSTE_URL}/changePassword/${emailid}`;
  console.log(link);
  sendData(
    existUser.emailid,
    "forgot password",
    FogetFormat(existUser.username, link)
  );
  res.json("send mail");
};

exports.changePassword = async (req, res) => {
  const { emailid, password, confirmpassword } = req.body;
  console.log(emailid);
  const user = await User.findOne({ emailid: emailid });
  if (!user) {
    res.json({
      success: false,
      message: "something went wrong link",
    });
  }
  if (password !== confirmpassword) {
    res.json({
      success: false,
      message: "confirm password not match",
    });
  }
  const hashpass = await hashpassword(password);
  const update = await User.updateOne(
    {
      emailid: emailid,
    },
    {
      password: hashpass,
    }
  );
  if (update) {
    res.redirect("/signin");
  }
};
