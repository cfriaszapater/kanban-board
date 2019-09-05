import React from "react";
import uuid from "uuid/v1";
import { createCard } from "../../store/board/createCardActions";
import { Card } from "../../store/board/types";
import { ThunkDispatch } from "redux-thunk";

export class AddCardButton extends React.Component<AddCardButtonProps> {
  onClick = () => {
    let card: Card = {
      id: uuid(),
      content: "Click here to edit this card"
    };
    this.props.dispatch(createCard(card));
  };

  render() {
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
