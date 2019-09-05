import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { boardReducer as board } from "./board/boardReducer";
import { loginReducer } from "./login/loginReducer";
import { alertReducer } from "./alert/alertReducer";

const rootReducer = combineReducers({
  board,
  login: loginReducer,
  alert: alertReducer
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
