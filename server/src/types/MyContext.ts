import { Request, Response } from "express";

interface R extends Request {
  adminId?: number;
}

export type MyContext = {
  req: R;
  res: Response;
};
