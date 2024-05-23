import express from "express";
import * as threadController from "./controller";
import { loginRequired } from "../../utils/auth";

export const threadRouter = express.Router();
threadRouter.post("/create", loginRequired, threadController.createThread);
threadRouter.get("/list", loginRequired, threadController.getThread);
threadRouter.get("/:id", loginRequired, threadController.getThreadDetail);
threadRouter.put("/edit/:id", loginRequired, threadController.editThread);
threadRouter.delete("/:id", loginRequired, threadController.deleteThread);
threadRouter.post(
  "/like/:id",
  loginRequired,
  threadController.createLikeThread
);
