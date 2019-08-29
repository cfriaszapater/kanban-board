import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  MOVE_WITHIN_COLUMN,
  MOVE_BETWEEN_COLUMNS,
  CardsActionsTypes,
  BEGIN_TASK_EDITING,
  BeginTaskEditingAction,
  FINISH_TASK_EDITING,
  FinishTaskEditingAction
} from "./actions";
import {
  CreateCardActions,
  CREATE_CARD_BEGIN,
  CreateCardBeginAction,
  CreateCardSuccessAction,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAILURE,
  CreateCardFailureAction
} from "./createCardAction";
import {
  KanbanBoardState,
  TaskLoading,
  TaskLoaded,
  TaskErrorLoading,
  Task
} from "./types";

export const initialState: KanbanBoardState = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: []
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  loading: false,
  error: null
};

export function cardsReducer(
  state: KanbanBoardState = initialState,
  action: CardsActionsTypes | CreateCardActions
) {
  switch (action.type) {
    case FETCH_CARDS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CARDS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
        columns: action.payload.columns,
        columnOrder: action.payload.columnOrder
      };

    case FETCH_CARDS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.error,
        tasks: {},
        columns: {},
        columnOrder: []
      };

    case MOVE_WITHIN_COLUMN:
      const newTaskIds = Array.from(action.startCol.taskIds);
      newTaskIds.splice(action.source.index, 1);
      newTaskIds.splice(action.destination.index, 0, action.draggableId);
      const newColumn = {
        ...action.startCol,
        taskIds: newTaskIds
      };
      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

    case MOVE_BETWEEN_COLUMNS:
      const startTaskIds = Array.from(action.startCol.taskIds);
      startTaskIds.splice(action.source.index, 1);
      const newStartCol = {
        ...action.startCol,
        taskIds: startTaskIds
      };
      const endTaskIds = Array.from(action.endCol.taskIds);
      endTaskIds.splice(action.destination.index, 0, action.draggableId);
      const newEndCol = {
        ...action.endCol,
        taskIds: endTaskIds
      };
      return {
        ...state,
        columns: {
          ...state.columns,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol
        }
      };

    case CREATE_CARD_BEGIN:
      return addTaskToState(action, state);

    case CREATE_CARD_SUCCESS:
      return markTaskLoadedInState(action, state);

    case CREATE_CARD_FAILURE:
      return markTaskWithErrorInState(action, state);

    case BEGIN_TASK_EDITING:
      return markTaskEditingInState(action, state);

    case FINISH_TASK_EDITING:
      return updateTaskContentAfterEditingInState(action, state);

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

function addTaskToState(
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

function markTaskLoadedInState(
  action: CreateCardSuccessAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskLoaded: TaskLoaded = { ...action.payload, loading: false };
  return stateWithUpdatedTask(state, taskLoaded);
}

function markTaskWithErrorInState(
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

function markTaskEditingInState(
  action: BeginTaskEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const taskWithEditingEnabled: Task = {
    ...action.task,
    editing: action.editing
  };
  return stateWithUpdatedTask(state, taskWithEditingEnabled);
}

function updateTaskContentAfterEditingInState(
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

function stateWithUpdatedTask(
  state: KanbanBoardState,
  taskToUpdate: Task
): KanbanBoardState {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskToUpdate.id]: taskToUpdate
    }
  };
}
