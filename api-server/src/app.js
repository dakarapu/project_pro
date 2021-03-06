import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import dbConnection from "./db/index";
import config from "config";
import cors from "cors";

const app = express();

process.on("uncaughtException", ex => {
  console.log("Got Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", ex => {
  console.log("Got Unhandled Rejection");
  process.exit(1);
});

if (!config.get("jwtPrivateKey")) {
  // exiting the app if the jwtPrivateKey variable is not set
  // exit code other than zero indicates error
  console.log("FATAL ERROR: jwtPrivateKey is not defined!!");
  process.exit(1);
}

const { host, username, password, db } = config.get("database");

if (host && username && password && db) {
  dbConnection();
} else {
  // exiting app process if database connection details is not set from env
  console.log("FATAL ERROR: database connection details is not set !!");
  process.exit(1);
}

switch (process.env.NODE_ENV) {
  case "development":
    console.log("App_Env: ", process.env.NODE_ENV);
    app.use(morgan("dev"));
    break;
  case "production":
    console.log("App_Env: ", process.env.NODE_ENV);
    app.use(morgan("tiny"));
    break;
  default:
    console.log("Default environment.....");
    app.use(morgan("short"));
    break;
}

// enabling CORS on server
// passing CORS options exposedHeaders, allowedHeaders
// exposedHeaders option will set Access-Control-Expose-Headers on HTTP response headers
// allowedHeaders option will set Access-Control-Allow-Headers on HTTP request headers
app.use(
  cors({
    exposedHeaders: ["x-auth-token"],
    allowedHeaders: ["x-auth-token", "content-type"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes.courseRouter);
app.use(routes.userRouter);
app.use(routes.authRouter);

export default app;
