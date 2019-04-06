import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  searchAndUpdateUser,
  deleteUser
} from "../db/models/user";

import bcrypt from "bcrypt";

export async function validateUser(pwd, email) {
  let user = await getUserByEmail(email);
  if (user && !user.hasOwnProperty("message")) {
    let validUser = await bcrypt.compare(pwd, user.password);
    if (validUser) {
      return user;
    }
  }
  return null;
}
