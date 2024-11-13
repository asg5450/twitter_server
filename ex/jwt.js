import jwt from "jsonwebtoken";

// jwt.sign({payload 정보}, "비밀키", {시간관리 옵션})
const token = jwt.sign({ id: "apple", isAdmin: false }, "abcdefg1234%^&*", {
  expiresIn: "2h",
});

setTimeout(() => {
  jwt.verify(token, "abcdefg1234%^&*", (error, decoded) => {
    console.log(`error: ${error}, decoded: `, decoded);
  });
}, 3000);

console.log(token);
