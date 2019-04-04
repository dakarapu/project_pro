import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
//import dbConnection from "./controllers/db/index";
// import {
//   createCourse,
//   getCourses,
//   updateCourse,
//   searchAndUpdateCourse,
//   deleteCourse
// } from "./controllers/db/models/course";

const app = express();

console.log(`NODE_ENV: ${app.get("env")}`);

switch (process.env.NODE_ENV) {
  case process.env.NODE_ENV:
    console.log("Development environment.....");
    app.use(morgan("dev"));
    break;
  default:
    console.log("Default environment.....");
    app.use(morgan("tiny"));
    break;
}

//dbConnection();
//createCourse();
//getCourses();
//updateCourse("5ca43a165c79570774180c2a");
//deleteCourse("5ca43a165c79570774180c2a");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes.courseRouter);
app.use(routes.userRouter);

export default app;
