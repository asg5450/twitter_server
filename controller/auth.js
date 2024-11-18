import * as authRepository from "../data/auth.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import path from "path";

async function createJwtToken(id) {
  return jwt.sign(
    // id: id,  그냥 id 쓰면 됨
    { id },
    config.jwt.secretKey,
    { expiresIn: config.jwt.expiresInSec }
  );
}

// 회원가입
export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const found = await authRepository.findByUsername(username);
  if (found) {
    return res
      .status(409)
      .json({ message: `${username}는 이미 사용중인 계정입니다.` });
  }
  const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);
  const userId = await authRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  console.log(`userId : ${userId}`);
  const token = await createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function signUpPage(req, res, next) {
  res.sendFile(
    path.join(process.cwd(), "static", "account-sign-up-image.html")
  );
}

// 로그인
export async function login(req, res, next) {
  const { username, password } = req.body;
  console.log(`username : ${username}`);
  const user = await authRepository.findByUsername(username);

  if (!user) {
    return res.status(402).json(`${username} 아이디를 찾을 수 없음`);
  }

  const isInvalidPassword = await bcrypt.compare(password, user.password);
  if (!isInvalidPassword) {
    return res.status(401).json({ message: `아이디 또는 비밀번호 확인` });
  }

  const token = await createJwtToken(user.id);
  console.log(`token : ${token}`);
  res.status(200).header("authToken", token).json({ token });
}

export async function signInPage(req, res, next) {
  res.sendFile(path.join(process.cwd(), "static", "account-sign-in.html"));
}

export async function verify(req, res, next) {
  const token = req.header["Token"];
  if (token) {
    res.status(200).json(token);
  }
}

export async function me(req, res, next) {
  // req객체의 Header 프로퍼티도 'req.키'로 접근할 수 있다.
  const user = await authRepository.findById(req.userId);

  if (!user) return res.status(404).json({ message: "일치하는 사용자가 없음" });

  res.status(200).json({ token: req.token, username: user.username });
}
