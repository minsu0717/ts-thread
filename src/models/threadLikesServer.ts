import { Schema, model, Types } from "mongoose";

interface threadLikes {
  user_id: Types.ObjectId;
  thread_id: Types.ObjectId;
}

const threadLikesSchema = new Schema<threadLikes>({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  thread_id: { type: Schema.Types.ObjectId, required: true, ref: "Threads" },
});

export const ThreadLikes = model<threadLikes>("ThreadLikes", threadLikesSchema);
