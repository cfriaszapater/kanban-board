import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cards from "./cards/reducers";

const rootReducer = combineReducers({
  cards
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppState = ReturnType<typeof rootReducer>;
