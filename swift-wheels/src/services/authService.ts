//requester
import * as requester from "./requester";

//types
import { headerType } from "@/app/utilities/types/authService.types";

const baseUrl = "http://localhost:3030/users";

const getAuthHeaders = () => {
  let headers: headerType = {
    "Content-Type": "application/json",
  };

  const authenticationEntity = localStorage.getItem("auth");

  if (authenticationEntity) {
    const token = JSON.parse(authenticationEntity).accessToken;
    headers = { ...headers, "X-Authorization": token };
  }

  return headers;
};

export const login = (loginData: object) => {
  return requester.post(JSON.stringify(loginData), `${baseUrl}/login`);
};

export const logout = () => {
  const headers = getAuthHeaders();
  requester.authorizationGet(headers, {}, `${baseUrl}/logout`);
};

export const register = (registerData: { email: string; password: string }) => {
  return requester.post(
    JSON.stringify({
      email: registerData.email,
      password: registerData.password,
    }),
    `${baseUrl}/register`
  );
};
