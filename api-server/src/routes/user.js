import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";

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

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to homepage!!");
});

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:id", (req, res) => {
  const course = users.find(obj => {
    return obj.id === parseInt(req.params.id);
  });

  if (course !== undefined) {
    res.status(200).send(course);
  } else {
    res.status(404).send(`No course available with the requested ID`);
  }
});

router.post("/users", (req, res) => {
  Schemas.userObjValidation(req.body, res);
  const check = users.find(obj => {
    return obj.id === req.body.id || obj.name === req.body.name;
  });

  if (check === undefined) {
    users.push(req.body);
    res.status(201).send(users);
  } else {
    res.status(400).send(`Data exists cannot ovveride`);
  }
});

router.delete("/users/:id", (req, res) => {
  let item = users.find(e => {
    return e.id === parseInt(req.params.id);
  });

  if (item) {
    users.splice(users.indexOf(item), 1);
    return res.status(200).send(users);
  } else {
    return res.status(404).send("No data found");
  }
});

router.put("/users/:id", (req, res) => {
  Schemas.userObjValidation(req.body, res);

  let item = users.find(e => {
    return e.id === parseInt(req.params.id);
  });

  if (item && item.id === req.body.id) {
    users.splice(users.indexOf(item), 1, req.body);
    return res.status(200).send(users);
  } else {
    return res.status(404).send("No data found");
  }
});

export default router;
