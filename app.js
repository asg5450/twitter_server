import express from "express";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import cors from "cors";
import path from "path";
import { sequelize } from "./db/database.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "static")));
app.use(express.urlencoded({ extended: true }));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

sequelize.sync().then(() => {
  const server = app.listen(config.host.port);
  initSocket(server);
});
