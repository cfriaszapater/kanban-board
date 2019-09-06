import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUBMIT_VALIDATION_FAILED,
  LOGIN_SUCCESS,
  LoginActions,
  LOGOUT,
  CHANGE_LOGIN_EDITING
} from "./loginActions";

export interface LoginState {
  loggingIn: boolean;
  username: string;
  password: string;
  submitted: boolean;
}

export const initialState: LoginState = {
  loggingIn: false,
  password: "",
  submitted: false,
  username: ""
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        submitted: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false
      };
    case CHANGE_LOGIN_EDITING:
      if (action.username !== undefined) {
        return {
          ...state,
          username: action.username
        };
      } else if (action.password !== undefined) {
        return {
          ...state,
          password: action.password
        };
      } else {
        throw Error("Unexpected: username and password are undefined");
      }
    case LOGOUT:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_SUBMIT_VALIDATION_FAILED:
      return {
        ...state,
        submitted: true
      };
    default:
      return state;
  }
}
