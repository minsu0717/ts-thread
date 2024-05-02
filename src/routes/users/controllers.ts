import { token } from "morgan";
import * as userService from "../users/service";
import { Request, Response } from "express";

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
