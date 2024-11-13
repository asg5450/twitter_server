import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  //   express-validator객체의 생성자에 req객체를 넣으면
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};
