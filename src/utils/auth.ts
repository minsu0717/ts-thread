import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../routes/users/service";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";

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
    const payload = (await jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    )) as JwtPayload;
    console.log("payload :", payload);
    const user = await getUserById(payload.id);
    console.log(user);
    if (!user) {
      const error = new CustomError(404, "User does not exist");
      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user;
    next();
  } catch (err) {
    const customError = new CustomError(401, "Invalid Access Token");
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }
};
