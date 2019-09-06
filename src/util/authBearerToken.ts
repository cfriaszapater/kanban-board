import { tokenInLocalStorage } from "./tokenInLocalStorage";

export function authBearerToken() {
  const token = tokenInLocalStorage();
  if (token) {
    // return authorization header with jwt token
    return "Bearer " + token;
  }
  return null;
}
