import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cardsReducer as board } from "./board/reducers";
import { authentication } from "./auth/authentication.reducer";
import { alert } from "./alert/alert.reducer";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  board,
  authentication,
  alert
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
