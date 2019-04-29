import axios from "axios";
import { postRequest } from "./httpClient";

const AuthenticateUser = async user => {
  if (user) {
    console.log("Login User Req Obj: ", user);
    let res = await postRequest("/auth", "", user);
    return res;
  }
};

export default AuthenticateUser;
