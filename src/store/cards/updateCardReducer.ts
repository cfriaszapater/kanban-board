import {
  BeginTaskEditingAction,
  FinishTaskEditingAction,
  ChangeTaskEditingAction
} from "./actions";
import { KanbanBoardState, Task } from "./types";
import { stateWithUpdatedTask } from "./reducers";

export function beginTaskEditing(
  action: BeginTaskEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskWithEditingEnabled: Task = {
    ...action.task,
    editing: action.editing
  };
  return stateWithUpdatedTask(state, taskWithEditingEnabled);
}

export function beginCommitTaskEditing(
  action: FinishTaskEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskWithUpdatedContent: Task = {
    ...action.task,
    content: action.newContent,
    editing: false
  };
  return stateWithUpdatedTask(state, taskWithUpdatedContent);
}

export function changeTaskEditing(
  action: ChangeTaskEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskWithUpdatedContent: Task = {
    ...action.task,
    content: action.newContent,
    editing: true
  };
  return stateWithUpdatedTask(state, taskWithUpdatedContent);
}
