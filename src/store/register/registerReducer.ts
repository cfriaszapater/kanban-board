import {
  CREATE_USER_BEGIN,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  RegisterActions,
  CHANGE_REGISTER_EDITING
} from "./registerActions";

export interface RegisterState {
  registerInProgress?: boolean;
  submitted?: boolean;
  // XXX Set directly by registerPage for now:
  username?: string;
  password?: string;
}

const initialState = {
  username: "",
  password: "",
  submitted: false
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
      return {};
    case CREATE_USER_FAILURE:
      return {};
    case CHANGE_REGISTER_EDITING:
      if (typeof action.username !== "undefined") {
        return {
          ...state,
          username: action.username
        };
      } else {
        return {
          ...state,
          password: action.password
        };
      }
    default:
      return state;
  }
}
