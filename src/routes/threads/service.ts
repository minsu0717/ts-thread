import { Types } from "mongoose";
import { Thread } from "../../models/threadServer";
import { CustomError } from "../../utils/customError";

export const createThread = async (userId: Types.ObjectId, content: string) => {
  try {
    const thread = new Thread({
      user_id: userId,
      content: content,
    });
    await thread.save();
  } catch (err) {
    err = new CustomError(500, "db error");
    throw err;
  }
};
