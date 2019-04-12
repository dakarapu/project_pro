import mongoose from "mongoose";
import config from "config";

const { host, username, password, db } = config.get("database");

const dbConnection = function() {
  mongoose
    .connect(`mongodb://${host}/${db}`)
    .then(() => {
      console.info("Connection to Database is established...");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB: ", err);
      process.exit(1); // exiting app process if can't make database connection
    });
};

export default dbConnection;
