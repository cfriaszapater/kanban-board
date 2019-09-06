import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { alertReducer as alert } from "./alert/alertReducer";
import { boardReducer as board } from "./board/boardReducer";
import { loginReducer as login } from "./login/loginReducer";
import { registerReducer as register } from "./register/registerReducer";

const rootReducer = combineReducers({
  board,
  login,
  register,
  alert
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
