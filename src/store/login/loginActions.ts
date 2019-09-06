import { history } from "../../util/history";
import { alertActions } from "../alert/alertActions";
import { loginClient } from "./client/login";
import { User } from "./types";

export function login(username: string, password: string) {
  return (dispatch: any) => {
    if (!username || !password) {
      dispatch({ type: LOGIN_SUBMIT_VALIDATION_FAILED });
      return;
    }

    dispatch(request({ username, password }));

    loginClient.loginForToken(username, password).then(
      () => {
        dispatch(success());
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

  function request(user: User): LoginBeginAction {
    return { type: LOGIN_REQUEST, user };
  }
  function success(): LoginSuccessAction {
    return { type: LOGIN_SUCCESS };
  }
  function failure(error: Error): LoginFailureAction {
    return { type: LOGIN_FAILURE, error };
  }
}

export function logout(): LogoutAction {
  loginClient.logout();
  return { type: LOGOUT };
}

export function changeLoginEditing(userData: {
  username?: string;
  password?: string;
}): ChangeLoginEditingAction {
  console.log("changeLoginEditing", userData.username, userData.password);
  return {
    password: userData.password,
    type: CHANGE_LOGIN_EDITING,
    username: userData.username
  };
}

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const CHANGE_LOGIN_EDITING = "CHANGE_LOGIN_EDITING";
export const LOGIN_SUBMIT_VALIDATION_FAILED = "LOGIN_SUBMIT_VALIDATION_FAILED";

export interface LoginBeginAction {
  type: typeof LOGIN_REQUEST;
  user: User;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: Error;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface ChangeLoginEditingAction {
  type: typeof CHANGE_LOGIN_EDITING;
  username?: string;
  password?: string;
}

export interface LoginSubmitValidationFailed {
  type: typeof LOGIN_SUBMIT_VALIDATION_FAILED;
}

export type LoginActions =
  | LoginBeginAction
  | LoginFailureAction
  | LoginSuccessAction
  | LogoutAction
  | ChangeLoginEditingAction
  | LoginSubmitValidationFailed;
