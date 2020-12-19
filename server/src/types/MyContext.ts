import { Request, Response } from "express";

interface R extends Request {
  adminId?: number;
  studentId?: number;
  facultyId?: number;
}

export type MyContext = {
  req: R;
  res: Response;
};
