import express from "express";
import * as tweetController from "../controller/tweet.js";
const router = express.Router();
// data
// 해당 아이디에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets?username=:username
router.get("/", tweetController.getTweets);

// 글번호에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets/:id
router.get("/:id", tweetController.getTweet);

// 트윗하기
// POST
// http://127.0.0.1:8080/tweets
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post("/", tweetController.createTweet);

// 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.put("/:id", tweetController.updateTweet);

// 트윗 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
