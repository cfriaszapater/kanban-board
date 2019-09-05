import { backendUrl } from "../../../util/backendUrl";
import { User } from "../../board/types";

export const loginClient = {
  login,
  logout
};

function login(username: string, password: string): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${backendUrl()}/users/token`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response: Response): Promise<User> {
  return response.text().then(text => {
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

    const user: User = text && JSON.parse(text);
    return Promise.resolve(user);
  });
}
