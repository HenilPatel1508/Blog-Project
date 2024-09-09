const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;
const path = require("path");
require('dotenv').config()

require("./config/db");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const blogModel = require("./models/blogModel");
const upload = require("./util/fileUpload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use("/profile", express.static(path.join(__dirname, "uploads")));

app.get("/blog_add", (req, res) => {
  res.render("blog_add");
});
app.get("/view_blog", async (req, res) => {
  const data = await blogModel.find();
  res.render("view_blog", {
    data: data,
  });
});
app.get("/", (req, res) => {
  if (!req.cookies.admin) {
    res.redirect("/signin");
  }
  const admin = req.cookies.admin;
  res.render("index", {
    admin: admin,
  });
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/logout", (req, res) => {
  res.clearCookie("user", { httpOnly: true });
  res.redirect("/signin");
});
app.get("/forgatePassword", (req, res) => {
  res.render("forgatePassword");
});
app.get('/changePassword/:emailid', (req, res) => {
  console.log(req.params);
  const { emailid } = req.params
  res.render('changePassword',{
    emailid: emailid
  })
})
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`port number: ${PORT}`);
});

// delete the blog
app.post("/delete/:id", async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    res.redirect("/view_blog");
  } catch (err) {
    res.status(500).send(err);
  }
});

//update blog
app.get("/update/:id", async (req, res) => {
  try {
    const item = await blogModel.findById(req.params.id);
    res.render("blog_update", { item });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/update/:id", upload.single("blog_image"), async (req, res) => {
  try {
    const { blog_title, blog_description, about_blog } = req.body;
    console.log(req.body);
    const blog_image = req?.file?.filename;
    await blogModel.findByIdAndUpdate(req.params.id, {
      blog_image,
      blog_title,
      blog_description,
      about_blog,
    });
    res.redirect("/view_blog");
  } catch (err) {
    res.status(500).send(err);
  }
});
