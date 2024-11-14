import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  // process객체는 Node.js에서 관리하는 객체인데 'dotenv.config()'를 통해 process에 없던 메소드가 생긴다.
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`키 ${key}는 undefined!!`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 259200)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
