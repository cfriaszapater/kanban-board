import {
  CHANGE_REGISTER_EDITING,
  CREATE_USER_BEGIN,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  REGISTER_SUBMIT_VALIDATION_FAILED,
  RegisterActions
} from "./registerActions";

export interface RegisterState {
  username: string;
  password: string;
  password2: string;
  submitted: boolean;
  registerInProgress: boolean;
}

export const initialState: RegisterState = {
  password: "",
  password2: "",
  registerInProgress: false,
  submitted: false,
  username: ""
};

export function registerReducer(
  state: RegisterState = initialState,
  action: RegisterActions
): RegisterState {
  switch (action.type) {
    case CREATE_USER_BEGIN:
      return {
        ...state,
        registerInProgress: true,
        submitted: true
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        registerInProgress: false
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        registerInProgress: false
      };
    case CHANGE_REGISTER_EDITING:
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
      } else if (action.password2 !== undefined) {
        return {
          ...state,
          password2: action.password2
        };
      } else {
        throw Error(
          "Unexpected: all username, password and password2 are undefined"
        );
      }
    case REGISTER_SUBMIT_VALIDATION_FAILED:
      return {
        ...state,
        submitted: true
      };
    default:
      return state;
  }
}
