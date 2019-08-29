import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "./store/cards/types";
import { setTaskEditing } from "./store/cards/actions";
import { ThunkDispatch } from "redux-thunk";

interface TaskProps {
  key: string;
  task: Task;
  index: number;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface ContainerProps {
  isDragging: boolean;
  error?: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragging ? "lightgreen" : props.error ? "red" : "white"};
`;

export class TaskView extends React.Component<TaskProps> {
  handleOnClick = (e: any) => {
    console.log("click");
    this.props.dispatch(setTaskEditing(this.props.task, true));
  };

  handleOnBlur = () => {
    console.log("blur");
    this.props.dispatch(setTaskEditing(this.props.task, false));
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            error={this.props.task.error}
            contentEditable={this.props.task.editing}
            suppressContentEditableWarning={true}
            onClick={this.handleOnClick}
            onBlur={this.handleOnBlur}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
