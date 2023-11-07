//requester
import * as requester from "./requester";

//base url
const baseUrl = "http://localhost:3030/users";

export const login = (loginData: object) =>
  requester.post(JSON.stringify(loginData), `${baseUrl}/login`);
