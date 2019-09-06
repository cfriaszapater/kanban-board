import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import { Card } from "../../store/board/types";
import {
  beginCardEditing,
  changeCardEditing,
  deleteCard,
  updateCard
} from "../../store/board/updateCardActions";

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
  cursor: pointer;
`;

export class CardView extends React.Component<CardProps> {
  public handleClick = () => {
    if (this.cardCreateDidNotSuccessYet()) {
      console.log(
        "not beginning editing because this card's create has not yet finished",
        this.props.card
      );
      return;
    }
    this.props.dispatch(beginCardEditing(this.props.card));
  };

  public handleChange = (event: ContentEditableEvent) => {
    this.props.dispatch(changeCardEditing(this.props.card, event.target.value));
  };

  public handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    this.props.dispatch(updateCard(this.props.card, event.target.innerHTML));
  };

  public handleClickDelete = () => {
    this.props.dispatch(deleteCard(this.props.card));
  };

  public render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => {
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
                style={
                  this.props.card.editing
                    ? { cursor: "text" }
                    : { cursor: "inherit" }
                }
              />
            </ContainerDiv>
          );
        }}
      </Draggable>
    );
  }

  private cardCreateDidNotSuccessYet() {
    return typeof this.props.card._id === "undefined";
  }
}
