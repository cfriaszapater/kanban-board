import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cardsReducer as cards } from "./cards/reducers";
import { authentication } from "./auth/authentication.reducer";
import { alert } from "./alert/alert.reducer";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  // XXX rename "cards" reducer to "board"?
  cards,
  authentication,
  alert
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
