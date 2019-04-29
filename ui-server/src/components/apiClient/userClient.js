//import React from "react";
import axios from "axios";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "./httpClient";
import ls from "local-storage";

const token = ls.get("x-auth-token");

const CreateUser = user => {
  console.log(" User create obj: ", user);
  user.role = "registeredUser"; // this needs to be fixed
  return postRequest("/users", token, user);
};

export default CreateUser;
