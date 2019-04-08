import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as courseController from "../controllers/courseController";
import {
  authenticateRoute,
  checkPermissions
} from "../middleware/authorization";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to homepage!!");
});

// course retrieve all
router.get(
  "/courses",
  [authenticateRoute, checkPermissions], // middleware for authorization
  async (req, res) => {
    let courses = await courseController.getAll();
    res.send(courses);
  }
);

// course retrieve by id
router.get(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    const course = await courseController.getCourse(req.params.id);
    if (course !== undefined || course.length > 0) {
      res.status(200).send(course);
    } else {
      res.status(404).send(`No course available with the requested ID`);
    }
  }
);

// course create router
router.post(
  "/courses",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let error = Schemas.courseObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }
    let result = await courseController.create(req.body);
    if (result.error) return res.status(400).send(result.error);
    return res.status(201).send(result.response);
  }
);

// course update router
router.put(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let error = Schemas.courseObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }
    let id = parseInt(req.params.id);
    let obj = req.body;
    let result = await courseController.update(id, obj);
    if (!result)
      return res.status(404).send("No course found with requested courseId");
    return res.status(200).send(result);
  }
);

// course delete router
router.delete(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await courseController.remove(id);
    if (!result)
      return res.status(404).send("No course found with requested courseId");
    return res.status(200).send(result);
  }
);

export default router;
