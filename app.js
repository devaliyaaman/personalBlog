const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lod = require("lodash");

const homeStartingContent =
  "Welcome to Coder's Blog! This is a space where I share my thoughts, experiences, and passions with you. Join me on this journey as we explore various topics and engage in meaningful discussions.";

// creating array of blogs
const blogs = [];
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Managing Get requests of different routes
app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, blogs: blogs });
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/blogs/:value", function (req, res) {
  const reqValue = lod.lowerCase(req.params.value);
  blogs.forEach(function (blog) {
    let blogTitle = lod.lowerCase(blog.title);
    if (blogTitle === reqValue) {
      res.render("post", { post: blog });
    }
  });
});

//Post request for composing a blogpost
app.post("/compose", function (req, res) {
  const blog = {
    title: req.body.blogTitle,
    post: req.body.blogPost,
  };
  blogs.push(blog);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
