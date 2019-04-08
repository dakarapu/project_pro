import {
  createUser,
  getUsers,
  getUserById,
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
  try {
    let users = await getUsers();
    if (users.length < 1) return "No users available";
    return users;
  } catch (e) {
    return e;
  }
}

export async function getUser(id) {
  try {
    let user = await getUserById(id);
    return user;
  } catch (e) {
    return e;
  }
}

export async function checkIfUserExists(id) {
  try {
    let user = await getUserByEmail(id);
    return user;
  } catch (e) {
    return e;
  }
}

export async function update(id, obj) {
  try {
    let user = await updateUser(id, obj);
    return user;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let user = await deleteUser(id);
    return user;
  } catch (e) {
    return e;
  }
}
