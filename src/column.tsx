import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Task, ITask } from './task';

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnProps {
  key: string;
  column: IColumn;
  tasks: ITask[];
}

interface TaskListProps {
  isDraggingOver: boolean;
}

interface InnerListProps {
  tasks: ITask[];
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
    background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends React.PureComponent<InnerListProps> {
  render () {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export class Column extends React.Component<ColumnProps> {
  render () {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={this.props.tasks} />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
