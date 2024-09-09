const blogModel = require("../models/blogModel");

exports.create = async (req, res) => {
  try {
    const blog_image = req?.file?.filename;
    const { blog_title, blog_description, about_blog } = req.body;
    const blog = await blogModel.create({
      blog_image,
      blog_title,
      blog_description,
      about_blog,
    });
    if (blog) {
      res.redirect("/");
    } else {
      res.status(404).json({
        success: false,
        Message: "data are not inserted",
      });
    }
  } catch (err) {}
};
