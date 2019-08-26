import React from "react";
import { connect } from "react-redux";
import { fetchCards } from "./cardsActions";
import styled from 'styled-components';
import { DragDropContext, DropResult, DraggableLocation, DraggableId } from 'react-beautiful-dnd';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Column, IColumn } from './column';
import { ITask } from './task';

interface INameToTaskMap {
  [key: string]: ITask;
}

interface INameToColumnMap {
  [key: string]: IColumn;
}

interface IAppState {
  tasks: INameToTaskMap;
  columns: INameToColumnMap;
  columnOrder: string[];
}

interface KanbanBoardProps {
  tasks: INameToTaskMap;
  columns: INameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error;
  dispatch: ThunkDispatch<{}, {}, AnyAction>;
}

const Container = styled.div`
  display: flex;
`;

class KanbanBoard extends React.Component<KanbanBoardProps, IAppState> {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  onDragEnd = (result: DropResult) => {
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

  moveWithinSameColumn(startCol: IColumn, source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId) {
    // TODO refactor to redux action
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

  moveBetweenColumns(startCol: IColumn, endCol: IColumn, source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId) {
    // TODO refactor to redux action
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

  render() {
    const { error, loading } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {
            this.props.columnOrder.map(columnId => {
              const column = this.props.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })
          }
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state: any) => ({
  columnOrder: state.cards.columnOrder,
  columns: state.cards.columns,
  tasks: state.cards.tasks,
  loading: state.cards.loading,
  error: state.cards.error
});

export default connect(mapStateToProps)(KanbanBoard);
