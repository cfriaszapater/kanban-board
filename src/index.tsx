import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import KanbanBoard from './kanbanBoard';
import { store } from './store';

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
