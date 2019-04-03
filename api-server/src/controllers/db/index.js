import mongoose from "mongoose";

const dbConnection = function() {
  mongoose
    .connect("mongodb://localhost/portal_pro")
    .then(() => {
      console.log("Connection to Database is established...");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB: ", err);
    });
};

export default dbConnection;
