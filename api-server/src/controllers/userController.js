import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  searchAndUpdateUser,
  deleteUser
} from "../db/models/user";

import bcrypt from "bcrypt";

export async function create(obj) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(obj.password, salt);
  obj.password = hash;
  let user = await createUser(obj);
  return user;
}

export async function getAll() {
  let users = await getUsers();
  if (users.length < 1) return "No users available";
  return users;
}

export async function getUser(email) {
  let user = await getUserByEmail(email);
  return user;
}

export async function update(id, obj) {
  let user = await updateUser(id, obj);
  return user;
}

export async function remove(id) {
  let user = await deleteUser(id);
  return user;
}
