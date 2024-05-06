import { Request, Response } from "express";
import * as threadService from "./service";
import { Types } from "mongoose";

export const createThread = async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = req.user?._id as Types.ObjectId;

  await threadService.createThread(userId, content);
  res.json({ message: "작성완료" });
};
