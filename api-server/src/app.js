import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import Joi from "Joi";

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "../public")));
//app.get("/", indexRouter);

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Science" },
  { id: 3, name: "Social" }
];

app.get("/", (req, res) => {
  res.send({ homePage: "hello world, welcome to homepage!!" });
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find(obj => {
    return obj.id === parseInt(req.params.id);
  });

  if (course !== undefined) {
    res.status(200).send(course);
  } else {
    res.status(404).send(`No course available with the requested ID`);
  }
});

app.post("/courses", (req, res) => {
  schemaValidation(req.body, res);

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

app.delete("/courses/:id", (req, res) => {
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

app.put("/courses/:id", (req, res) => {
  schemaValidation(req.body, res);

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

function schemaValidation(body, res) {
  const postSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(2)
      .required()
  });

  let { error } = Joi.validate(body, postSchema);

  if (error) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
}

export default app;
