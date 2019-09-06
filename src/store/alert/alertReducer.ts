import {
  ALERT_CLEAR,
  ALERT_ERROR,
  ALERT_SUCCESS,
  AlertActions
} from "./alertActions";

export function alertReducer(state = {}, action: AlertActions) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        message: action.message,
        type: "alert-success"
      };
    case ALERT_ERROR:
      return {
        message: action.message,
        type: "alert-danger"
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
