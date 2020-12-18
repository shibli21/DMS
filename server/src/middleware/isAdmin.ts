import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.adminId) {
    throw new Error("not authenticated");
  }

  return next();
};
