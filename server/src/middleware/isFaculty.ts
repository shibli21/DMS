import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isFaculty: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.facultyId) {
    throw new Error("not authenticated");
  }

  return next();
};
