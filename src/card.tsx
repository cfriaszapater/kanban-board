import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "./store/cards/types";
import {
  beginCardEditing,
  changeCardEditing,
  updateCard
} from "./store/cards/updateCardActions";
import { ThunkDispatch } from "redux-thunk";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface CardProps {
  key: string;
  card: Card;
  index: number;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface ContainerProps {
  isDragging: boolean;
  error?: boolean;
}

const ContainerDiv = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragging ? "lightgreen" : props.error ? "red" : "white"};
`;

const DeleteButton = styled.a`
  color: red;
  float: right;
`;

export class CardView extends React.Component<CardProps> {
  handleClick = () => {
    console.log("click");
    if (this.cardCreateDidNotSuccessYet()) {
      console.log(
        "not beginning editing because this card's create has not yet finished",
        this.props.card
      );
    }
    this.props.dispatch(beginCardEditing(this.props.card));
  };

  handleChange = (event: ContentEditableEvent) => {
    console.log("change with value ", event.target.value);
    this.props.dispatch(changeCardEditing(this.props.card, event.target.value));
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    console.log("blur with value ", event.target.innerHTML);
    this.props.dispatch(updateCard(this.props.card, event.target.innerHTML));
  };

  handleClickDelete = () => {
    console.log("click delete");
    // TODO this.props.dispatch(deleteCard(this.props.card));
  };

  private cardCreateDidNotSuccessYet() {
    return typeof this.props.card._id === "undefined";
  }

  render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => {
          console.log("this.props.card.editing: ", this.props.card.editing);
          return (
            <ContainerDiv
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              error={this.props.card.error}
              onClick={this.handleClick}
            >
              <DeleteButton id="deleteButton" onClick={this.handleClickDelete}>
                &#10006;
              </DeleteButton>
              <ContentEditable
                html={this.props.card.content} // innerHTML of the editable div
                disabled={!this.props.card.editing} // use true to disable edition
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
            </ContainerDiv>
          );
        }}
      </Draggable>
    );
  }
}
