import { ThunkDispatch } from "redux-thunk";
import { alertActions } from "../alert/alertActions";
import { history } from "../../util/history";
import { User } from "../login/types";
import { post } from "../../util/fetchJson";
import { backendUrl } from "../../util/backendUrl";

export const createUser = (username?: string, password?: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void> => {
  if (!username || !password) {
    dispatch({ type: REGISTER_SUBMIT_VALIDATION_FAILED });
    return;
  }

  const user = { username: username, password: password };
  dispatch(request(user));

  try {
    const createdUser = await post(backendUrl() + "/users", user);
    dispatch(success(createdUser));
    history.push("/");
  } catch (err) {
    dispatch(alertActions.error(err.message));
    dispatch(failure(err));
  }

  function request(user: User) {
    return { type: CREATE_USER_BEGIN, user };
  }
  function success(user: User) {
    return { type: CREATE_USER_SUCCESS, user };
  }
  function failure(error: Error) {
    console.log(error);
    return { type: CREATE_USER_FAILURE, error };
  }
};

export function changeRegisterEditing(userData: {
  username?: string;
  password?: string;
}): ChangeRegisterEditingAction {
  return {
    type: CHANGE_REGISTER_EDITING,
    username: userData.username,
    password: userData.password
  };
}

export const CREATE_USER_BEGIN = "CREATE_USER_BEGIN";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const CHANGE_REGISTER_EDITING = "CHANGE_REGISTER_EDITING";
export const REGISTER_SUBMIT_VALIDATION_FAILED =
  "REGISTER_SUBMIT_VALIDATION_FAILED";

export type RegisterActions =
  | CreateUserBeginAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | ChangeRegisterEditingAction
  | RegisterSubmitValidationFailed;

export interface CreateUserBeginAction {
  type: typeof CREATE_USER_BEGIN;
  user: User;
}

export interface CreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS;
  user: User;
}

export interface CreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE;
  error: Error;
}

export interface ChangeRegisterEditingAction {
  type: typeof CHANGE_REGISTER_EDITING;
  username?: string;
  password?: string;
}

export interface RegisterSubmitValidationFailed {
  type: typeof REGISTER_SUBMIT_VALIDATION_FAILED;
}
