import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../../models/usersServer";
import { CustomError } from "../../utils/customError";
import axios from "axios";

const redirectUri = "http://localhost:3000/auth/kakao/finish";
const clientId = process.env.KAKAO_KEY;

export const getAuth = async () => {
  try {
    const authorizationUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    return authorizationUrl;
  } catch (err) {
    err = new CustomError(500, "INTERNAL ERROR");
    throw err;
  }
};
