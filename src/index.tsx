import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store";
import KanbanBoard from './kanbanBoard';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppState = ReturnType<typeof rootReducer>

function App() {
  return (
    <div className="App">
      <KanbanBoard />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
