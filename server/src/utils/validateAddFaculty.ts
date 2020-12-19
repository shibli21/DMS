import { Faculty } from "./../entities/Faculty";
import { AddFacultyInputType } from "../types/InputTypes/addFacultyInputType";

export const validateAddFaculty = async (input: AddFacultyInputType) => {
  let errors = [];
  const emailExists = await Faculty.findOne({
    where: {
      email: input.email,
    },
  });

  if (input.username.includes("@")) {
    errors.push({
      field: "username",
      message: "Can't includes an @ ",
    });
  }
  if (input.username.length <= 2) {
    errors.push({
      field: "username",
      message: "name can't be less than 2 word",
    });
  }

  if (emailExists) {
    errors.push({
      field: "email",
      message: "Email already exists",
    });
  }

  if (!input.email.includes("@") && !emailExists) {
    errors.push({
      field: "email",
      message: "Invalid email",
    });
  }

  if (errors.length > 0) {
    return errors;
  }

  return null;
};
