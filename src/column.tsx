import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { TaskView } from "./task";
import { AddTaskButton } from "./addTaskButton";
import { Column, Task } from "./store/cards/types";
import { ThunkDispatch } from "redux-thunk";

interface ColumnProps {
  key: string;
  column: Column;
  tasks: Task[];
  addTaskButton: boolean;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface TaskListProps {
  isDraggingOver: boolean;
  dispatch: ThunkDispatch<{}, {}, any>;
}

interface InnerListProps {
  tasks: Task[];
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

const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    return this.props.tasks.map((task, index) => (
      <TaskView
        key={task.id}
        task={task}
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
        {this.props.addTaskButton ? (
          <AddTaskButton dispatch={this.props.dispatch} />
        ) : null}
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              dispatch={this.props.dispatch}
            >
              <InnerList
                tasks={this.props.tasks}
                dispatch={this.props.dispatch}
              />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
