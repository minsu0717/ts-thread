import express from "express";
import { userRouter } from "./users/routers";

export const routes = express.Router();
routes.use("/auth", userRouter);
