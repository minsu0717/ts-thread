import * as userService from "../users/service";
import { Request, Response } from "express";

export const getAuth = async (req: Request, res: Response) => {
  const auth = await userService.getAuth();
  res.redirect(auth);
};
