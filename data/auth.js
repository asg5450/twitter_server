import { db } from "../db/database.js";

export async function findByUsername(username) {
  return db
    .execute("select * from users where username=?", [username])
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("select * from users where id=?", [id])
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      "insert into users (username, password, name, email, url) values (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
