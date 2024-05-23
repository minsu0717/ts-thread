import { Types } from "mongoose";
import { Thread } from "../../models/threadServer";
import { CustomError } from "../../utils/customError";
import { ThreadLikes } from "../../models/threadLikesServer";

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

export const getThread = async (userId: Types.ObjectId) => {
  try {
    const data = await Thread.aggregate([
      {
        $match: { user_id: userId },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                nickname: 1,
                profile_image: 1,
              },
            },
          ],
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "threadlikes",
          localField: "_id",
          foreignField: "thread_id",
          as: "likes",
        },
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          _id: 1,
          user_id: 1,
          nickname: "$user.nickname",
          profileImage: "$user.profile_image",
          content: 1,
          likeCount: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
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
    const [data] = await Thread.find({
      user_id: userId,
      _id: threadId,
    }).populate("user_id", { nickname: 1 });
    return data;
  } catch (err) {
    err = new CustomError(500, "db error");
    throw err;
    // console.log(err);
  }
};

export const editThread = async (
  userId: Types.ObjectId,
  threadId: string,
  content: string
) => {
  try {
    await Thread.updateOne(
      { user_id: userId, _id: threadId },
      { $set: { content: content } }
    );
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};

export const deleteThread = async (
  threadId: string,
  userId: Types.ObjectId
) => {
  try {
    const result = await Thread.deleteOne({ _id: threadId, user_id: userId });
    return result;
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};

export const createThreadLike = async (
  userId: Types.ObjectId,
  threadId: string
) => {
  try {
    const threadLike = new ThreadLikes({
      user_id: userId,
      thread_id: threadId,
    });
    await threadLike.save();
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};

export const deleteThreadLike = async (
  userId: Types.ObjectId,
  threadId: string
) => {
  try {
    const result = await ThreadLikes.deleteOne({
      thread_id: threadId,
      user_id: userId,
    });
    return result;
  } catch (err) {
    // err = new CustomError(500, "db error");
    // throw err;
    console.log(err);
  }
};
