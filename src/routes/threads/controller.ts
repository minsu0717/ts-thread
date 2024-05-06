import { Request, Response } from "express";
import * as threadService from "./service";

export const createThread = async (req: Request, res: Response) => {
  const { userId, content } = req.body;
  await threadService.createThread(userId, content);
  res.json({ message: "작성완료" });
};
