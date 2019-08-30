import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { CardView } from "./card";
import { AddCardButton } from "./addCardButton";
import { Column, Card } from "./store/cards/types";
import { ThunkDispatch } from "redux-thunk";

interface ColumnProps {
  key: string;
  column: Column;
  cards: Card[];
  addCardButton: boolean;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface CardListProps {
  isDraggingOver: boolean;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface InnerListProps {
  cards: Card[];
  dispatch: ThunkDispatch<{}, {}, any>;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 33%;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

const CardList = styled.div<CardListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    return this.props.cards.map((card, index) => (
      <CardView
        key={card.id}
        card={card}
        index={index}
        dispatch={this.props.dispatch}
      />
    ));
  }
}

export class ColumnView extends React.Component<ColumnProps> {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        {this.props.addCardButton ? (
          <AddCardButton dispatch={this.props.dispatch} />
        ) : null}
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <CardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              dispatch={this.props.dispatch}
            >
              <InnerList
                cards={this.props.cards}
                dispatch={this.props.dispatch}
              />
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    );
  }
}
