import { Schema, model, Types } from "mongoose";

interface thread {
  user_id: Types.ObjectId;
  content: string;
}

const ThreadSchema = new Schema<thread>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    content: { type: String, maxlength: 500 },
  },
  {
    timestamps: true,
  }
);

export const Thread = model<thread>("Threads", ThreadSchema);
