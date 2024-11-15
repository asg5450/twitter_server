import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let channel;

// 127.0.0.1:8080/client.html 접속이 가능해짐
app.use(express.static(__dirname));

const channels = new Set();

io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다."); // 서버 console에 뜨는 내용

  // 로그인 redirect
  socket.on("login_with_nickname", (value) => {
    console.log("login try client socket : ", socket);
    socket.emit("login_with_nickname", {
      status: "success",
      nickname: value,
    });
  });

  // 닉네임 설정
  socket.on("setNickname", (value) => {
    socket.data.nickname = value;
    socket.emit("setNickname", {
      status: "success",
      nickname: socket.data.nickname,
    });
  });

  // 메시지 설정
  socket.on("message", (reqObject) => {
    console.log(
      `클라이언트 : ${reqObject.nickname} 채널${reqObject.channel} -> ${reqObject.message}`
    );
    // io.emit("message", { sender: nickname, message }); // 채널 구분없이 보내기
    socket.broadcast.to(reqObject.channel).emit("message", {
      sender: reqObject.nickname,
      message: reqObject.message,
      me: false,
    });

    socket.emit("message", {
      sender: reqObject.nickname,
      message: reqObject.message,
      me: true,
    });
  });

  // 채널 설정
  socket.on("setChannel", (ch) => {
    console.log(`기존 channel : ${channel}`);
    if (channel) {
      socket.leave(channel);
    }
    channel = ch;
    console.log(`새 channel : ${channel}`);
    socket.join(channel);
    channels.add(channel);
    console.log(`클라이언트: ${socket.data.nickname}님이 ${channel}에 입장`);
    socket.emit("updateChannelList", {
      channelList: Array.from(channels),
      channel,
    });
    socket.broadcast.emit("updateChannelList", {
      channelList: Array.from(channels),
    });
  });

  // 소캣 종료
  socket.on("disconnect", () => {
    console.log(`클라이언트: ${socket.data.nickname} 접속 종료!`);
  });
});

server.listen(8080, () => {
  console.log("서버가 8080포트에서 실행됩니다!");
});
