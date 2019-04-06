import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as userController from "../controllers/userController";

let router = express.Router();

// user retrieve all
router.get("/users", async (req, res) => {
  let users = await userController.getAll();
  res.send(users);
});

// user retrieve by id
router.get("/users/:id", async (req, res) => {
  const user = await userController.getUser(req.params.id);
  if (user !== undefined || user.length > 0) {
    res.status(200).send(user);
  } else {
    res.status(404).send(`No user available with the requested ID`);
  }
});

// user create router
router.post("/users", async (req, res) => {
  let error = Schemas.userObjValidation(req.body);
  if (error !== null) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
  let user = await userController.getUser(req.body.email);
  if (user && user.hasOwnProperty("message")) {
    user = await userController.create(req.body);
    return res.status(201).send(user.response);
  } else {
    return res.status(400).send("User already exists with this email.");
  }
});

// user update router
router.put("/users/:id", async (req, res) => {
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
});

// user delete router
router.delete("/users/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await userController.remove(id);
  if (!result)
    return res.status(404).send("No user found with requested userId");
  return res.status(200).send(result);
});

export default router;
