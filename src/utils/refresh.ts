import jwt from "jsonwebtoken";
import "dotenv/config";

export const makeRefreshToken = () => {
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: "14d",
  });

  return refreshToken;
};
