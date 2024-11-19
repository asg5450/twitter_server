import MongoDb, { ReturnDocument } from "mongodb";
import { getTweets } from "../db/database.js";
import * as UserRepository from "./auth.js";

const ObjectID = MongoDb.ObjectId;

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) =>
    getTweets()
      .insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url,
      })
      .then((result) => getTweets().findOne({ _id: result.insertedId }))
      .then(mapOptionalTweet)
  );
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id } : tweet;
}

function mapTweets(tweet) {
  return tweet.map(mapOptionalTweet);
}
