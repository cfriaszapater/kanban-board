import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { boardReducer as board } from "./board/boardReducer";
import { loginReducer as login } from "./login/loginReducer";
import { alertReducer as alert } from "./alert/alertReducer";

const rootReducer = combineReducers({
  board,
  login,
  alert
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
