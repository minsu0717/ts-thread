import { Types } from "mongoose";
import { Thread } from "../../models/threadServer";
import { CustomError } from "../../utils/customError";
import { Users } from "../../models/usersServer";

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

// interface ThreadDocument {
//   _id: Types.ObjectId;
//   user_id: {
//     _id: string;
//     nickname: string;
//     email: string;
//     creaedAt: Date;
//     updaedAt: Date;
//     _v: number;
//   };
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
export const getThread = async (userId: Types.ObjectId) => {
  try {
    const data = await Thread.find({
      user_id: userId,
    }).populate("user_id", { nickname: 1 });
    // const modifiedData = data.map((e) => ({
    //   _id: e._id,
    //   user_id: { nickname: e.user_id?.nickname }, // Optional chaining 사용하여 user_id가 null이 아닌 경우에만 nickname에 접근
    //   content: e.content,
    //   createdAt: e.createdAt,
    //   updatedAt: e.updatedAt,
    // }));
    return data;
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};

export const getThreadDetail = async (
  userId: Types.ObjectId,
  threadId: string
) => {
  try {
    const data = await Thread.find({
      user_id: userId,
      _id: threadId,
    }).populate("user_id", { nickname: 1 });
    return data;
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};
