import { Schema, model, Types } from "mongoose";

interface threadComments {
  thread_id: Types.ObjectId;
  user_id: Types.ObjectId;
  content: string;
}

const threadCommentsSchema = new Schema<threadComments>(
  {
    thread_id: { type: Schema.Types.ObjectId, required: true, ref: "Threads" },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    content: { type: String, maxlength: 500 },
  },
  {
    timestamps: true,
  }
);

export const ThreadComments = model<threadComments>(
  "Threadcomments",
  threadCommentsSchema
);
