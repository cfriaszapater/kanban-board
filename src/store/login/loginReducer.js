import { loginConstants } from "./loginConstants";

export const initialState = { loggingIn: false };

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        loggingIn: false
      };
    case loginConstants.LOGOUT:
      return {
        loggingIn: false
      };
    default:
      return state;
  }
}
