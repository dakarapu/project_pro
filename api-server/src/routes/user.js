import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as userController from "../controllers/userController";
import {
  authenticateRoute,
  checkPermissions
} from "../middleware/authorization";

let router = express.Router();

// retrieve the current login user with authorization
router.get(
  "/users/me",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let id = req.user._id;
    const user = await userController.getUser(id);
    if (user !== undefined || user.length > 0) {
      // for security reasons we are just responding with below properties
      let { firstName, lastName, email, phone, role } = user;
      res.status(200).send({ firstName, lastName, email, phone, role });
    } else {
      res.status(404).send(`No user available with the requested ID`);
    }
  }
);

// user retrieve all
router.get(
  "/users",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let users = await userController.getAll();
    res.send(users);
  }
);

// user retrieve by id
router.get(
  "/users/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let id = parseInt(req.params.id);
    const user = await userController.getUser(id);
    if (user !== undefined || user.length > 0) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`No user available with the requested ID`);
    }
  }
);

// user create router
router.post("/users", async (req, res) => {
  let error = Schemas.userObjValidation(req.body);
  if (error !== null) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
  console.log("EMAIl TO REGISTER: ", req.body.email);
  let user = await userController.checkIfUserExists(req.body.email);
  if (user && user.hasOwnProperty("message")) {
    user = await userController.create(req.body);
    return res.status(201).send(user.response);
  } else {
    return res.status(400).send("User already exists with this email.");
  }
});

// user update router
router.put(
  "/users/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let error = Schemas.userObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }
    let id = parseInt(req.params.id);
    let obj = req.body;
    let result = await userController.update(id, obj);
    if (!result)
      return res.status(404).send("No user found with requested userId");
    return res.status(200).send(result);
  }
);

// user delete router
router.delete(
  "/users/:id",
  [authenticateRoute, checkPermissions],
  async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await userController.remove(id);
    if (!result)
      return res.status(404).send("No user found with requested userId");
    return res.status(200).send(result);
  }
);

export default router;
