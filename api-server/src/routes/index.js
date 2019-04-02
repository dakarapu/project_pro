import express from "express";
let router = express.Router();
/* GET home page. */

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Science" },
  { id: 3, name: "Social" }
];

router.get("/", function(req, res, next) {
  //res.render("index", { title: "Express" });
  //res.send("Home Page");
  res.status(200).send({ user: "tobi" });
});

router.get("/home", function(req, res, next) {
  res.send("Home Page");
});

router.get("/courses", function(req, res) {
  res.send(courses);
});

export default router;
