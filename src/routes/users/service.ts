import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../../models/usersServer";
import { CustomError } from "../../utils/customError";
import axios from "axios";
import qs from "querystring";

const redirectUri = "http://localhost:3000/auth/kakao/finish";
const clientId = process.env.KAKAO_KEY;

export const getAuth = async () => {
  try {
    const authorizationUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    return authorizationUrl;
  } catch (err) {
    err = new CustomError(500, "인가 요청 실패");
    throw err;
  }
};

export const getAccessToken = async (code: string) => {
  try {
    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (err) {
    // err = new CustomError(500, "토큰 요청 실패");
    // throw err;
    console.log(err);
  }
};
