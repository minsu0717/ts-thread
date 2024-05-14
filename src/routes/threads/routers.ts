import express from "express";
import * as threadController from "./controller";
import { loginRequired } from "../../utils/auth";

export const threadRouter = express.Router();
threadRouter.post("/create", loginRequired, threadController.createThread);
threadRouter.get("/list", loginRequired, threadController.getThread);
