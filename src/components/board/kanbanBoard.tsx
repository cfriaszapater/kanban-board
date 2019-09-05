import React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import { ColumnView } from "./column";
import { fetchBoard } from "../../store/board/fetchBoardActions";
import {
  dragCardWithinColumn,
  dragCardBetweenColumns
} from "../../store/board/dragCardActions";
import {
  NameToColumnMap,
  NameToCardMap,
  KanbanBoardState
} from "../../store/board/types";
import { Link } from "react-router-dom";

interface KanbanBoardProps {
  cards: NameToCardMap;
  columns: NameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error | null;
  dispatch: ThunkDispatch<{}, {}, any>;
}

const Container = styled.div`
  display: flex;
`;

export default class KanbanBoard extends React.Component<
  KanbanBoardProps,
  KanbanBoardState
> {
  componentDidMount() {
    this.props.dispatch(fetchBoard());
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = this.props.columns[source.droppableId];
    const endCol = this.props.columns[destination.droppableId];
    if (startCol === endCol) {
      dragCardWithinColumn(
        startCol,
        source.index,
        destination.index,
        draggableId,
        this.props.dispatch
      );
    } else {
      dragCardBetweenColumns(
        startCol,
        endCol,
        source.index,
        destination.index,
        draggableId,
        this.props.dispatch
      );
    }
  };

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    let firstCol = true;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <Link to="/login">Logout</Link>
        </div>
        {error && (
          <div className="alert alert-danger">
            {error.message +
              " Please check your network connection and refresh."}
          </div>
        )}
        <Container>
          {this.props.columnOrder.map(columnId => {
            let addCardButton = false;
            if (firstCol) {
              addCardButton = true;
              firstCol = false;
            }
            const column = this.props.columns[columnId];
            const cards = column.cardIds.map(
              cardId => this.props.cards[cardId]
            );

            return (
              <ColumnView
                key={column.id}
                column={column}
                cards={cards}
                addCardButton={addCardButton}
                // XXX passing dispatch not needed
                dispatch={this.props.dispatch}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}
