import mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema); // 단수형으로 쓰고 s가 자동으로 붙는다?

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
