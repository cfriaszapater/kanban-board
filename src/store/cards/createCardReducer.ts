import {
  CreateCardBeginAction,
  CreateCardFailureAction
} from "./createCardActions";
import {
  KanbanBoardState,
  TaskLoading,
  TaskLoaded,
  TaskErrorLoading
} from "./types";
import { CreateCardSuccessAction } from "./createCardActions";
import { stateWithUpdatedTask } from "./reducers";

export function createCardBegin(
  action: CreateCardBeginAction,
  state: KanbanBoardState
): KanbanBoardState {
  const task: TaskLoading = { ...action.payload, loading: true };
  // Task added to tasks and columns[0].taskIds (was empty before)
  const firstCol = state.columns[Object.keys(state.columns)[0]];
  return {
    ...state,
    tasks: { ...state.tasks, [task.id]: task },
    columns: {
      ...state.columns,
      [firstCol.id]: {
        ...state.columns[firstCol.id],
        taskIds: [...state.columns[firstCol.id].taskIds, task.id]
      }
    }
  };
}

export function createCardSuccess(
  action: CreateCardSuccessAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskLoaded: TaskLoaded = { ...action.payload, loading: false };
  return stateWithUpdatedTask(state, taskLoaded);
}

export function createCardFailure(
  action: CreateCardFailureAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskWithErrorSet: TaskErrorLoading = {
    ...action.payload,
    loading: false,
    error: true
  };
  return stateWithUpdatedTask(state, taskWithErrorSet);
}
