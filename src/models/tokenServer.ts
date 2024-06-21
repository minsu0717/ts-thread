import { Schema, model, Types } from "mongoose";

interface token {
  user_id: Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema<token>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Token = model<token>("token", TokenSchema);
