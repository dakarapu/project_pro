//import React from "react";
import axios from "axios";

const CourseClient = token => {
  return new Promise(async (resolve, reject) => {
    //    if (user) {
    //console.log("Create User Req Obj: ", user);
    try {
      let res = await axios.get("http://localhost:3006/courses", {
        headers: { "x-auth-token": token }
      });
      resolve(res);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        reject(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        //console.log(error.request);
        reject(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log("Error", error.message);
        reject(error.message);
      }
    }
    //    }
  });
};

export default CourseClient;