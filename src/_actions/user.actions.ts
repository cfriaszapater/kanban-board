import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers";
import { User } from "../store/board/types";

export const userActions = {
  login,
  logout
};

function login(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username: username, password: password }));

    userService.login(username, password).then(
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
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user: User) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error: Error) {
    console.log("user.actions.failure: " + error);
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
