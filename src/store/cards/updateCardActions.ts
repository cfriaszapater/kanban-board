import { Task } from "./types";
import {
  BeginTaskEditingAction,
  BEGIN_TASK_EDITING,
  ChangeTaskEditingAction,
  CHANGE_TASK_EDITING,
  FinishTaskEditingAction,
  BEGIN_COMMIT_TASK_EDITING
} from "./actions";

export function beginTaskEditing(task: Task): BeginTaskEditingAction {
  return {
    type: BEGIN_TASK_EDITING,
    task: task,
    editing: true
  };
}

export function changeTaskEditing(
  task: Task,
  newContent: string
): ChangeTaskEditingAction {
  return {
    type: CHANGE_TASK_EDITING,
    task: task,
    newContent: newContent
  };
}

export function finishTaskEditing(
  task: Task,
  newContent: string
): FinishTaskEditingAction {
  return {
    type: BEGIN_COMMIT_TASK_EDITING,
    task: task,
    newContent: newContent
  };
}
