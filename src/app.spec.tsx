import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { givenAppStateWithSomeCards } from "../testUtil/givenStateWithSomeCards";
import App from "./app";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it("renders without crashing", () => {
  const store = mockStore(givenAppStateWithSomeCards());
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
