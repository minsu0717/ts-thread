import express from "express";
import * as userController from "./controllers";

export const userRouter = express.Router();
userRouter.get("/kakao", userController.getAuth);
userRouter.get("/kakao/finish", userController.getAccessToken);
userRouter.post("/signin", userController.signIn);
