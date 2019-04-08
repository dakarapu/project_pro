import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as courseController from "../controllers/courseController";
import {
  authenticateRoute,
  checkPermissions
} from "../middleware/authorization";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";
let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to homepage!!");
});

// course retrieve all
router.get(
  "/courses",
  [authenticateRoute, checkPermissions], // middleware for authorization
  // middleware function to handle this callback
  asyncCallbackMiddleware(async (req, res) => {
    let courses = await courseController.getAll();
    if (courses === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (courses && courses.length < 1) {
      res.status(404).send(`No course availables`);
    } else {
      res.status(200).send(courses);
    }
  })
);

// course retrieve by id
router.get(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  asyncCallbackMiddleware(async (req, res) => {
    const course = await courseController.getCourse(req.params.id);
    if (course !== undefined || course.length > 0) {
      res.status(200).send(course);
    } else {
      res.status(404).send(`No course available with the requested ID`);
    }
  })
);

// course create router
router.post(
  "/courses",
  [authenticateRoute, checkPermissions],
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.courseObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }

    try {
      let result = await courseController.create(req.body);
      if (result.error) return res.status(400).send(result.error);
      return res.status(201).send(result.response);
    } catch (e) {
      return res.status(500).send("Internal Server Error.");
    }
  })
);

// course update router
router.put(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  asyncCallbackMiddleware(async (req, res) => {
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
  })
);

// course delete router
router.delete(
  "/courses/:id",
  [authenticateRoute, checkPermissions],
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await courseController.remove(id);
    if (!result)
      return res.status(404).send("No course found with requested courseId");
    return res.status(200).send(result);
  })
);

export default router;
