import express from "express";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";

const app = express();

app.use(express.json());

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// React 등 모듈의 기본 port가 3000이기에 8080으로 설정
app.listen(8080);
