import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "./store/cards/types";
import {
  beginTaskEditing,
  finishTaskEditing,
  changeTaskEditing
} from "./store/cards/actions";
import { ThunkDispatch } from "redux-thunk";
import ContentEditable from "react-contenteditable";

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

const ContainerDiv = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragging ? "lightgreen" : props.error ? "red" : "white"};
`;

export class TaskView extends React.Component<TaskProps> {
  handleClick = () => {
    console.log("click");
    this.props.dispatch(beginTaskEditing(this.props.task));
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    console.log("blur with value ", event.target.innerHTML);
    this.props.dispatch(
      finishTaskEditing(this.props.task, event.target.innerHTML)
    );
  };

  handleChange = (event: any) => {
    console.log("change with value ", event.target.value);
    this.props.dispatch(changeTaskEditing(this.props.task, event.target.value));
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => {
          console.log("this.props.task.editing: ", this.props.task.editing);
          return (
            <ContainerDiv
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              error={this.props.task.error}
              onClick={this.handleClick}
            >
              <ContentEditable
                html={this.props.task.content} // innerHTML of the editable div
                disabled={!this.props.task.editing} // use true to disable edition
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
