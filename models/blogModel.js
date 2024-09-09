const { Schema, model } = require("mongoose");

const schemaFormat = {
  type: String,
  required: true,
  trim: true,
};

const blogSchema = new Schema({
  blog_image: {
    ...schemaFormat,
  },
  blog_title: {
    ...schemaFormat,
  },
  blog_description: {
    ...schemaFormat,
  },
  about_blog: {
    ...schemaFormat,
  },
},{
    timestamps: true,
});

const Blog = model("Blog", blogSchema);
module.exports = Blog;