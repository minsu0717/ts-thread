import express from "express";
import * as threadController from "./controller";

export const threadRouter = express.Router();
threadRouter.post("/create", threadController.createThread);
