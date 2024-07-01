import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../routes/users/service";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";
import { accessTokenVerify, refreshDecodeVerify } from "./refresh";

export const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;
    const refreshToken = req.headers.refresh;
    const refreshDecode = await jwt.decode(refreshToken as string);
    console.log("refreshDecode : ", refreshDecode);
    if (!accessToken) {
      const error = new CustomError(401, "Need Access Token");
      return res.status(error.statusCode).json({ message: error.message });
    }
    const payload = await accessTokenVerify(accessToken);
    console.log("payload :", payload);
    if (typeof payload === "string") {
      const user = await getUserById(payload);
      console.log(user);
      if (!user) {
        const error = new CustomError(404, "User does not exist");
        return res.status(error.statusCode).json({ message: error.message });
      }
      const token = await refreshDecodeVerify(payload, refreshToken as string);
      console.log("token : ", token);

      req.user = user;
      next();
    }
  } catch (err) {
    const customError = new CustomError(401, "Invalid Access Token");
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }
};
