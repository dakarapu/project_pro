import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import dbConnection from "./db/index";
import config from "config";
const app = express();

console.log(`NODE_ENV: ${app.get("env")}`);

if (!config.get("jwtPrivateKey")) {
  // exiting the app if the jwtPrivateKey variable is not set
  // exit code other than zero indicates error
  console.log("FATAL ERROR: jwtPrivateKey is not defined!!");
  process.exit(1);
}

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

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes.courseRouter);
app.use(routes.userRouter);
app.use(routes.authRouter);

export default app;
