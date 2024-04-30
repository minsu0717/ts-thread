import express from "express";
import * as userController from "./controllers";

export const userRouter = express.Router();
userRouter.get("/kakao", userController.getAuth);
