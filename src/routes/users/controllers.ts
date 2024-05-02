import { CustomError } from "../../utils/customError";
import * as userService from "../users/service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getAuth = async (req: Request, res: Response) => {
  const auth = await userService.getAuth();
  res.redirect(auth);
};

export const getAccessToken = async (req: Request, res: Response) => {
  try {
    const code: string | undefined = req.query.code as string;
    console.log("-----------------", code);
    const token = await userService.getAccessToken(code);
    console.log("-----------;", token);
    res.json(token);
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (req: Request, res: Response) => {
  // const { email, password }: { email: string; password: string } = req.body;
  const kakaoToken = req.headers.authorization;
  if (!kakaoToken) {
    return res.status(400).json({ message: "Authorization token is missing" });
  }
  const data = await userService.kakaoSignIn(kakaoToken);

  const email = data.data.kakao_account.email;
  console.log(email);

  const user = await userService.getUserByEmail(email);
  if (!user) {
    const error = new CustomError(401, "카카오 회원가입이 필요합니다.");
  } else {
    res.send("성공.");
  }
};
