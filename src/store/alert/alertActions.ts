export const alertActions = {
  clear,
  error,
  success
};

function success(message: string): AlertSuccessAction {
  return { type: ALERT_SUCCESS, message };
}

function error(message: string): AlertErrorAction {
  return { type: ALERT_ERROR, message };
}

function clear(): AlertClearAction {
  return { type: ALERT_CLEAR };
}

export const ALERT_CLEAR = "ALERT_CLEAR";
export const ALERT_ERROR = "ALERT_ERROR";
export const ALERT_SUCCESS = "ALERT_SUCCESS";

export interface AlertSuccessAction {
  type: typeof ALERT_SUCCESS;
  message: string;
}

export interface AlertErrorAction {
  type: typeof ALERT_ERROR;
  message: string;
}

export interface AlertClearAction {
  type: typeof ALERT_CLEAR;
}

export type AlertActions =
  | AlertSuccessAction
  | AlertErrorAction
  | AlertClearAction;
