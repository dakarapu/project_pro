import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as courseController from "../controllers/courseController";

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

// course retrieve all
router.get("/courses", async (req, res) => {
  let courses = await courseController.getAll();
  res.send(courses);
});

// course retrieve by id
router.get("/courses/:id", async (req, res) => {
  // const course = courses.find(obj => {
  //   return obj.id === parseInt(req.params.id);
  // });

  const course = await courseController.getCourse(req.params.id);
  if (course !== undefined || course.length > 0) {
    res.status(200).send(course);
  } else {
    res.status(404).send(`No course available with the requested ID`);
  }
});

// course create router
router.post("/courses", async (req, res) => {
  Schemas.courseObjValidation(req.body, res);
  // const check = courses.find(obj => {
  //   return obj.id === req.body.id || obj.name === req.body.name;
  // });

  // if (check === undefined) {
  //   courses.push(req.body);
  //   res.status(201).send(courses);
  // } else {
  //   res.status(400).send(`Data exists cannot ovveride`);
  // }

  let result = await courseController.create(req.body);
  if (result.error) return res.status(400).send(result.error);
  return res.status(201).send(result.response);
});

// course delete router
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

// course update router
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
