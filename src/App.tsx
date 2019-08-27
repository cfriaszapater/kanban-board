import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import KanbanBoard from './kanbanBoard';

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    </div>
  );
}
