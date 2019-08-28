import React from "react";
import uuid from "uuid/v1";
import { createCard } from "./store/cards/createCardAction";
import { Task } from "./store/cards/types";
import { ThunkDispatch } from "redux-thunk";

export class AddTaskButton extends React.Component<AddTaskButtonProps> {
  onClick = () => {
    let task: Task = { id: uuid(), content: "Hola" };
    this.props.dispatch(createCard(task));
  };

  render() {
    return (
      <button name="addTask" type="button" onClick={this.onClick}>
        +
      </button>
    );
  }
}

interface AddTaskButtonProps {
  dispatch: ThunkDispatch<{}, {}, any>;
}
