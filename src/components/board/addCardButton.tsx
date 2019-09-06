import React from "react";
import { ThunkDispatch } from "redux-thunk";
import uuid from "uuid/v1";
import { createCard } from "../../store/board/createCardActions";
import { Card } from "../../store/board/types";

export class AddCardButton extends React.Component<AddCardButtonProps> {
  public onClick = () => {
    const card: Card = {
      content: "Click to edit this card",
      id: uuid()
    };
    this.props.dispatch(createCard(card));
  };

  public render() {
    return (
      <button name="addCard" type="button" onClick={this.onClick}>
        +
      </button>
    );
  }
}

interface AddCardButtonProps {
  dispatch: ThunkDispatch<{}, {}, any>;
}
