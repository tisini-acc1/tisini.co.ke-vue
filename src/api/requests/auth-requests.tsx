import {
  LoginUserResponseInterface,
  RegisterUserResponseInterface,
  //   RequestFunction,
  SignInUserInterface,
  SignupUserInterface,
} from "@/types";
import tisiniRequestHandler from "./handler";

export const registerUserRequest = async function (
  data: SignupUserInterface,
  cb?: (data: RegisterUserResponseInterface, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "POST",
      url: "/auth/register/",
      data,
      callback: cb,
    },
    {
      type: "public",
    }
  );
};

export const loginUserRequest = async function (
  data: SignInUserInterface,
  cb?: (data: LoginUserResponseInterface, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "POST",
      url: "/auth/login/",
      data: data as any,
      callback: cb,
    },
    { type: "public" }
  );
};
// export const logoutUser: RequestFunction<SignInUserInterface, any> =
