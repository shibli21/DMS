import { RegisterAdminInputType } from "../types/InputTypes/RegisterAdminInputType";

export const validateAdminRegister = (input: RegisterAdminInputType) => {
  if (input.token !== process.env.ADMIN_VERIFICATION_CODE) {
    return [
      {
        field: "token",
        message: "Invalid token",
      },
    ];
  }
  if (input.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Can't includes an @ ",
      },
    ];
  }
  if (input.username.length <= 2) {
    return [
      {
        field: "username",
        message: "name can't be less than 2 word",
      },
    ];
  }
  if (!input.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (input.password.length < 6) {
    return [
      {
        field: "password",
        message: "password can't be less than 6 word",
      },
    ];
  }

  return null;
};
