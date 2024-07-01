import jwt from "jsonwebtoken";
import "dotenv/config";
import { getErrorMessage } from "./customError";
import { getRefreshToken } from "../routes/users/service";

export const makeRefreshToken = () => {
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: "14d",
  });

  return refreshToken;
};

export const accessTokenVerify = async (accessToken: string) => {
  try {
    const payload = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );

    return (payload as { id: string }).id;
  } catch (err) {
    return { ok: false, message: getErrorMessage(err) };
  }
};
// const refreshDecode = await jwt.decode(refreshToken as string);

export const refreshDecodeVerify = async (
  userId: string,
  refreshToken: string
) => {
  try {
    const token = await getRefreshToken(userId, refreshToken);
    console.log(token);
  } catch (err) {
    console.log(err);
  }
};
