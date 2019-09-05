import { loginConstants } from "./loginConstants";
import { loginClient } from "./client/login";
import { alertActions } from "../alert/alertActions";
import { history } from "../../util/history";
import { User } from "./types";

export const userActions = {
  login,
  logout
};

function login(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username: username, password: password }));

    loginClient.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      (error: Error | string) => {
        if (typeof error === "string") {
          error = new Error(error);
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user: User) {
    return { type: loginConstants.LOGIN_REQUEST, user };
  }
  function success(user: User) {
    return { type: loginConstants.LOGIN_SUCCESS, user };
  }
  function failure(error: Error) {
    console.log("user.actions.failure: " + error);
    return { type: loginConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  loginClient.logout();
  return { type: loginConstants.LOGOUT };
}
