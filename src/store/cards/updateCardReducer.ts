import {
  BeginTaskEditingAction,
  ChangeTaskEditingAction,
  UpdateCardBeginAction
} from "./updateCardActions";
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

export function updateCardBegin(
  action: UpdateCardBeginAction,
  state: KanbanBoardState
): KanbanBoardState {
  return stateWithUpdatedTask(state, action.task);
}
