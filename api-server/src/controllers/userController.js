import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  searchAndUpdateUser,
  deleteUser
} from "../db/models/user";

export async function create(obj) {
  let user = await createUser(obj);
  return user;
}

export async function getAll() {
  let users = await getUsers();
  if (users.length < 1) return "No users available";
  return users;
}

export async function getUser(id) {
  let user = await getUserById(id);
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
