import {
  CREATE_USER_BEGIN,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  RegisterActions,
  CHANGE_REGISTER_EDITING,
  REGISTER_SUBMIT_VALIDATION_FAILED
} from "./registerActions";

export interface RegisterState {
  username: string;
  password: string;
  submitted: boolean;
  registerInProgress: boolean;
}

export const initialState: RegisterState = {
  username: "",
  password: "",
  submitted: false,
  registerInProgress: false
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
      } else {
        throw Error("Unexpected: both username and password are undefined");
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
