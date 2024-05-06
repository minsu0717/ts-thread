import { Users } from "../../models/usersServer";
import { CustomError } from "../../utils/customError";
import axios from "axios";
import qs from "querystring";
import { Types } from "mongoose";

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

export const getUserByEmail = async (email: string) => {
  try {
    const [data] = await Users.find({ email: email });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id: Types.ObjectId) => {
  try {
    const [data] = await Users.find({ _id: id });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const kakaoSignIn = async (accessToken: string) => {
  try {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching user data from Kakao API:", error);
    throw new Error("Failed to fetch user data from Kakao API");
  }
};

export const createUser = async (nickname: string, email: string) => {
  try {
    const user = new Users({
      nickname: nickname,
      email: email,
    });
    await user.save();
  } catch (error) {
    error = new CustomError(400, "db insert 실패");
    throw error;
  }
};
