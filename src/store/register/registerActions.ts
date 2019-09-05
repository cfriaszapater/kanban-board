import { alertActions } from "../alert/alertActions";
import { history } from "../../util/history";
import { User } from "../login/types";
import { post } from "../../util/fetchJson";
import { backendUrl } from "../../util/backendUrl";

export async function createUser(user: User) {
  return async (dispatch: any) => {
    dispatch(request(user));

    try {
      const createdUser = await post(backendUrl() + "/users", user);
      await dispatch(success(createdUser));
      history.push("/");
    } catch (err) {
      dispatch(failure(err));
      dispatch(alertActions.error(err.message));
    }
  };

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
}

export const CREATE_USER_BEGIN = "CREATE_USER_BEGIN";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
