import { Schema, Types, model } from "mongoose";

export interface DBUser {
  _id: Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  phone_number: string;
  birth_day: Date;
  profile_image: string;
}

const UsersSchema = new Schema<DBUser>(
  {
    nickname: { type: String, maxlength: 50 },
    email: {
      type: String,
      unique: true,
      maxlength: 200,
      trim: true,
      required: true,
    },
    password: { type: String, maxlength: 200, trim: true },
    phone_number: { type: String, maxlength: 100 },
    birth_day: { type: Date },
    profile_image: { type: String, maxlength: 300 },
  },
  {
    timestamps: true,
  }
);

export const Users = model<DBUser>("Users", UsersSchema);
