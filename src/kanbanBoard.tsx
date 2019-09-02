import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import { ColumnView } from "./column";
import { AppState } from "./store";
import { fetchBoard } from "./store/cards/fetchBoardActions";
import {
  dragCardWithinColumn,
  dragCardBetweenColumns
} from "./store/cards/dragCardActions";
import {
  NameToColumnMap,
  NameToCardMap,
  KanbanBoardState
} from "./store/cards/types";

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

class KanbanBoard extends React.Component<KanbanBoardProps, KanbanBoardState> {
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

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    let firstCol = true;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
                dispatch={this.props.dispatch}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  columnOrder: state.cards.columnOrder,
  columns: state.cards.columns,
  cards: state.cards.cards,
  loading: state.cards.loading,
  error: state.cards.error
});

export default connect(mapStateToProps)(KanbanBoard);
