import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan("combined"));
  app.use(express.json());

  app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "pong" });
  });

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);

    next(err);
  });

  return app;
};
