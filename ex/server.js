import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { channel } from "diagnostics_channel";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 127.0.0.1:8080/client.html 접속이 가능해짐
app.use(express.static(__dirname));
// express.static('폴더경로') : 해당 폴더에 html들이 '{{base}}/파일명.html'로 랜더링 가능

const channels = new Set();

// socket.io 라이브러리 Server객체.on('이벤트', 콜백함수)
io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다."); // 서버 console에 뜨는 내용

  let nickname = "";
  let channel = "";

  // 닉네임 설정
  socket.on("setNickname", (value) => {
    nickname = value;
    console.log(`닉네임 설정 : ${value}`);
    io.emit("setNickname", `알림: 닉네임 설정됨 ${nickname}`);
  });

  // 메시지 설정
  socket.on("message", (message) => {
    console.log(`클라이언트 : ${nickname} -> ${message}`);
    // io.emit("message", { sender: nickname, message }); // 채널 구분없이 보내기
    io.to(channel).emit("message", { sender: nickname, message });
  });

  // 채널 설정
  socket.on("setChannel", (ch) => {
    if (channel) {
      socket.leave(channel);
    }
    channel = ch;
    socket.join(channel);
    channels.add(channel);
    console.log(`클라이언트: ${nickname}님이 ${channel}에 입장`);
    io.emit("updateChannelList", Array.from(channels));
  });

  // 소캣 종료
  socket.on("disconnect", () => {
    console.log(`클라이언트: ${nickname} 접속 종료!`);
  });
});

server.listen(8080, () => {
  console.log("서버가 8080포트에서 실행됩니다!");
});
