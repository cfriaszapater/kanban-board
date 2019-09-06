import { backendUrl } from "../../../util/backendUrl";
import {
  removeTokenFromLocalStorage,
  storeTokenInLocalStorage
} from "../../../util/tokenInLocalStorage";

export const loginClient = {
  loginForToken,
  logout
};

async function loginForToken(
  username: string,
  password: string
): Promise<string> {
  const requestOptions = {
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  };

  const response = await fetch(`${backendUrl()}/users/token`, requestOptions);
  const token = await handleResponse(response);
  // store jwt token in local storage to keep user logged in between page refreshes
  storeTokenInLocalStorage(token);
  return token;
}

function logout() {
  // remove token from local storage to log user out
  removeTokenFromLocalStorage();
}

async function handleResponse(response: Response): Promise<string> {
  const text = await response.text();
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }
    const data: any = text && JSON.parse(text);
    const error: string = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  const token = JSON.parse(text);
  return Promise.resolve(token);
}
