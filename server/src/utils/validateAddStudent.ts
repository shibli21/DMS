import { Student } from "./../entities/Student";
import { AddStudentInputType } from "./../types/InputTypes/AddStudentInputType";

export const validateAddStudent = async (input: AddStudentInputType) => {
  let errors = [];
  const emailExists = await Student.findOne({
    where: {
      email: input.email,
    },
  });

  const registrationNumberExists = await Student.findOne({
    where: {
      registrationNumber: input.registrationNumber,
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
  if (registrationNumberExists) {
    errors.push({
      field: "registrationNumber",
      message: "Registration number already exists",
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
