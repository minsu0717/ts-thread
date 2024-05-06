import express from "express";
import { userRouter } from "./users/routers";
import { threadRouter } from "./threads/routers";

export const routes = express.Router();
routes.use("/auth", userRouter);
routes.use("/thread", threadRouter);
