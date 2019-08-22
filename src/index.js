import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialData;
    this.onDragEnd = (result) => {
      // TODO
    };
  }

  render () {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {
          this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
