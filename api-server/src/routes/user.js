import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as userController from "../controllers/userController";

let router = express.Router();

const users = [
  {
    id: 1,
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce@outlook.com",
    phone: "0370259276"
  },
  {
    id: 2,
    name: "Tony",
    lastName: "Stark",
    email: "tony@gmail.com",
    phone: "0450018462"
  },
  {
    id: 3,
    name: "Peter",
    lastName: "Parker",
    email: "peter@yahoo.com",
    phone: "0474982543"
  }
];

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
  Schemas.userObjValidation(req.body, res);
  let result = await userController.create(req.body);
  if (result.error) return res.status(400).send(result.error);
  return res.status(201).send(result.response);
});

// user update router
router.put("/users/:id", async (req, res) => {
  Schemas.userObjValidation(req.body, res);
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
