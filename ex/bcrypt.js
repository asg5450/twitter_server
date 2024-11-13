import * as bcrypt from "bcrypt";

const password = "abcd1234";
const hashed = bcrypt.hashSync(password, 10); // (원래값, 비용 인자)
// 비용인자 = 높을수록 보안성 ↑ 속도 ↓

console.log(`password : ${password}, hashed: ${hashed}`);
// password : abcd1234, hashed: $2b$10$bS0bssBd9YknAoifND87sOc6y1pM5aJsghpmgf1C2cCUYiZQuuNkK
// 버전 : $2b
// 비용 인자 : $10
// 솔트값 : $bS0bssBd9YknAoifND87sO     *salt값은 Base64 기준 22글자 (A-Z, a-z, 0-9)
// 해시값 : 솔트값 뒤로 쭈욱
