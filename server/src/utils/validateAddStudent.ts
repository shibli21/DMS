import { Department } from "./../entities/Department";
import { Session } from "./../entities/Session";
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

  const session = await Session.findOne({
    where: { id: input.sessionId },
  });

  if (!session) {
    errors.push({
      field: "session",
      message: "Session doesn't exists!",
    });
  }

  if (input.departmentCode) {
    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });

    if (!department) {
      errors.push({
        field: "departmentCode",
        message: "Department doesn't exists!",
      });
    }
  } else {
    errors.push({
      field: "departmentCode",
      message: "Department doesn't exists!",
    });
  }

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
  if (!input.registrationNumber) {
    errors.push({
      field: "registrationNumber",
      message: "Invalid number!",
    });
  } else if (registrationNumberExists) {
    errors.push({
      field: "registrationNumber",
      message: "Registration number already exists",
    });
  } else if (input.registrationNumber.toString().length < 8) {
    errors.push({
      field: "registrationNumber",
      message: "Invalid registration number!",
    });
  }
  if (!input.address) {
    errors.push({
      field: "address",
      message: "Address can't be empty",
    });
  }
  if (!input.contactNumber) {
    errors.push({
      field: "contactNumber",
      message: "Invalid number!",
    });
  } else if (input.contactNumber.toString().length < 10) {
    errors.push({
      field: "contactNumber",
      message: "Invalid number!",
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
