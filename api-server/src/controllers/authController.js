import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  searchAndUpdateUser,
  deleteUser
} from "../db/models/user";
import config from "config";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function validateUser(pwd, email) {
  let user = await getUserByEmail(email);
  if (user && !user.hasOwnProperty("message")) {
    let validUser = await bcrypt.compare(pwd, user.password);
    if (validUser) {
      let token = jwt.sign(
        { _id: user._id, firstName: user.firstName, email: user.email },
        config.get("jwtPrivateKey") // reading this parameter from environment variable
      );
      return token;
    }
  }
  return null;
}
