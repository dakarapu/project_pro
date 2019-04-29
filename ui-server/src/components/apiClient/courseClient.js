import axios from "axios";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "./httpClient";
import ls from "local-storage";

const CourseClient = token => {
  return getRequest("/courses", ls.get("x-auth-token"));
};

export default CourseClient;
