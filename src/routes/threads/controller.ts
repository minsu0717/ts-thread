import { Request, Response } from "express";
import * as threadService from "./service";
import { Types } from "mongoose";
import { CustomError, reportError } from "../../utils/customError";

export const createThread = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user?._id as Types.ObjectId;

    await threadService.createThread(userId, content);
    res.json({ message: "작성완료" });
  } catch (err) {
    if (err instanceof CustomError) {
      console.log(err);
      reportError(err, res);
    }
  }
};

export const getThread = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as Types.ObjectId;
    const thread = await threadService.getThread(userId);
    res.status(200).json({ data: thread });
  } catch (err) {
    if (err instanceof CustomError) {
      console.log(err);
      reportError(err, res);
    }
  }
};
export const getThreadDetail = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as Types.ObjectId;
    const threadId = req.params.id;
    const thread = await threadService.getThreadDetail(userId, threadId);

    res.status(200).json({ data: thread });
  } catch (err) {
    if (err instanceof CustomError) {
      console.log(err);
      reportError(err, res);
    }
  }
};
export const editThread = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as Types.ObjectId;
    const threadId = req.params.id;
    const { content } = req.body;
    console.log(content);

    await threadService.editThread(userId, threadId, content);

    res.status(201).json({ message: "수정완료" });
  } catch (err) {
    if (err instanceof CustomError) {
      console.log(err);
      reportError(err, res);
    }
  }
};
