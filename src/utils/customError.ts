import { Response } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const reportError = (error: CustomError, res: Response) => {
  return res.status(error.statusCode).json({ message: error.message });
};
