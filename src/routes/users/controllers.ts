import { CustomError } from "../../utils/customError";
import { makeRefreshToken } from "../../utils/refresh";
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
    // console.log("-----------------", code);
    const token = await userService.getAccessToken(code);
    // console.log("-----------;", token);
    res.json(token);
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const kakaoToken = req.headers.authorization;
  if (!kakaoToken) {
    return res.status(400).json({ message: "Authorization token is missing" });
  }
  const data = await userService.kakaoSignIn(kakaoToken);
  const email = data.data.kakao_account.email;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    await userService.createUser(data.data.properties.nickname, email);
  } else {
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1s" }
    );
    const refreshToken = makeRefreshToken();
    await userService.updateRefreshToken(user._id, refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  }
};
