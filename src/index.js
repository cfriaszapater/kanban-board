import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialData;
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startCol = this.state.columns[source.droppableId];
    const endCol = this.state.columns[destination.droppableId];
    if (startCol === endCol) {
      this.moveWithinSameColumn(startCol, source, destination, draggableId);
    } else {
      this.moveBetweenColumns(startCol, endCol, source, destination, draggableId);
    }
  };

  moveWithinSameColumn(startCol, source, destination, draggableId) {
    const newTaskIds = Array.from(startCol.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...startCol,
      taskIds: newTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };
    this.setState(newState);
  }

  moveBetweenColumns(startCol, endCol, source, destination, draggableId) {
    const startTaskIds = Array.from(startCol.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...startCol,
      taskIds: startTaskIds
    };
    const endTaskIds = Array.from(endCol.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndCol = {
      ...endCol,
      taskIds: endTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }
    };
    this.setState(newState);
  }

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
        {
          this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
