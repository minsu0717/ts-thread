import { DBUser } from "../models/usersServer";

declare global {
  namespace Express {
    interface Request {
      user?: DBUser;
    }
  }
}
