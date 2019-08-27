import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ThunkDispatch } from 'redux-thunk';
import { Column } from './column';
import { AppState } from './store'
import { fetchCards, moveWithinSameColumn, moveBetweenColumns } from "./store/cards/actions";
import { NameToColumnMap, NameToTaskMap, KanbanBoardState } from './store/cards/types';

interface KanbanBoardProps {
  tasks: NameToTaskMap;
  columns: NameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error;
  dispatch: ThunkDispatch<{}, {}, any>;
}

const Container = styled.div`
  display: flex;
`;

class KanbanBoard extends React.Component<KanbanBoardProps, KanbanBoardState> {
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

    const startCol = this.props.columns[source.droppableId];
    const endCol = this.props.columns[destination.droppableId];
    if (startCol === endCol) {
      this.props.dispatch(moveWithinSameColumn(startCol, source, destination, draggableId));
    } else {
      this.props.dispatch(moveBetweenColumns(startCol, endCol, source, destination, draggableId));
    }
  };

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

const mapStateToProps = (state: AppState) => ({
  columnOrder: state.cards.columnOrder,
  columns: state.cards.columns,
  tasks: state.cards.tasks,
  loading: state.cards.loading,
  error: state.cards.error
});

export default connect(mapStateToProps)(KanbanBoard);
