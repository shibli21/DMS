import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isStudent: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.studentId) {
    throw new Error("not authenticated");
  }

  return next();
};
