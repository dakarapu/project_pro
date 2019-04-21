//import React from "react";
import axios from "axios";

const CreateUser = async user => {
  const x = {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony_s@gmail.com",
    password: "123456",
    phone: "0450018432",
    role: "registeredUser"
  };
  if (user) {
    console.log("Create User Req Obj: ", x);
    let res = await axios.post("http://localhost:3006/users", {
      query: x
    });
    return res;
  }
};

export default CreateUser;
