import mongoose from "mongoose";
import _ from "lodash";

const schema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true },
  lastName: { type: String, minlength: 2, required: true },
  email: { type: String, minlength: 5, required: true, unique: true },
  // password is hashed so maxlength is set to 1024
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true
  },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("user", schema);

export async function createUser(obj) {
  //let userObj = _.pick(obj,['firstName','lastName','email','password','phone'])
  //the above variable can be used to replace in creating new User instance
  // ex: const user = new User(userObj);
  const user = new User({
    firstName: obj.firstName,
    lastName: obj.lastName,
    email: obj.email,
    password: obj.password,
    phone: obj.phone
  });
  try {
    const result = await user.save();
    return { response: result };
  } catch (e) {
    let errorList = [];
    for (let field in e.errors) {
      errorList.push(e.errors[field].message);
    }
    return { error: errorList };
  }
}

// find all user by query
export async function getUsers() {
  try {
    const result = await User.find({}).sort({ name: 1 });
    if (!result) return { message: "No records found" };
    return result;
  } catch (e) {
    return e.error;
  }
}

// find a user by ID
export async function getUserByEmail(id) {
  try {
    const result = await User.findOne({ email: id });
    if (!result) return { message: "No user found" };
    return result;
  } catch (e) {
    return e.error;
  }
}

// this update function follows as by find and then save method
export async function searchAndUpdateUser(id) {
  const user = await User.findById(id);
  if (!user) return;

  user.firstName = "Ravikanth";
  user.lastName = "Dakarapu";
  const result = await user.save();
  return result;
}

export async function updateUser(id, obj) {
  try {
    const result = await User.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          firstName: obj.firstName,
          lastName: obj.lastName,
          email: obj.email,
          phone: obj.phone
        }
      },
      { new: true }
    );
    return result;
  } catch (e) {
    return e.error;
  }
}

export async function deleteUser(id) {
  const result = await User.findOneAndRemove({ userId: id });
  return result;
}
