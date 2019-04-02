import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";

let router = express.Router();
const courses = [
  { id: 1, name: "Telugu" },
  { id: 2, name: "Hindi" },
  { id: 3, name: "English" }
];

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to homepage!!");
});

router.get("/courses", (req, res) => {
  res.send(courses);
});

router.get("/courses/:id", (req, res) => {
  const course = courses.find(obj => {
    return obj.id === parseInt(req.params.id);
  });

  if (course !== undefined) {
    res.status(200).send(course);
  } else {
    res.status(404).send(`No course available with the requested ID`);
  }
});

router.post("/courses", (req, res) => {
  Schemas.courseObjValidation(req.body, res);
  const check = courses.find(obj => {
    return obj.id === req.body.id || obj.name === req.body.name;
  });

  if (check === undefined) {
    courses.push(req.body);
    res.status(201).send(courses);
  } else {
    res.status(400).send(`Data exists cannot ovveride`);
  }
});

router.delete("/courses/:id", (req, res) => {
  let item = courses.find(e => {
    return e.id === parseInt(req.params.id);
  });

  if (item) {
    courses.splice(courses.indexOf(item), 1);
    return res.status(200).send(courses);
  } else {
    return res.status(404).send("No data found");
  }
});

router.put("/courses/:id", (req, res) => {
  Schemas.courseObjValidation(req.body, res);

  let item = courses.find(e => {
    return e.id === parseInt(req.params.id);
  });

  if (item && item.id === req.body.id) {
    courses.splice(courses.indexOf(item), 1, req.body);
    return res.status(200).send(courses);
  } else {
    return res.status(404).send("No data found");
  }
});

export default router;
