import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  MOVE_WITHIN_COLUMN,
  MOVE_BETWEEN_COLUMNS,
  CardsActionsTypes
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
  TaskErrorLoading
} from "./types";

export const initialState: KanbanBoardState = {
  tasks: {},
  columns: {},
  columnOrder: [],
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
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [task.id]: task
    }
  };
}

function markTaskLoadedInState(
  action: CreateCardSuccessAction,
  state: KanbanBoardState
): KanbanBoardState {
  const task: TaskLoaded = { ...action.payload, loading: false };
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [task.id]: task
    }
  };
}

function markTaskWithErrorInState(
  action: CreateCardFailureAction,
  state: KanbanBoardState
): KanbanBoardState {
  const task: TaskErrorLoading = {
    ...action.payload,
    loading: false,
    error: true
  };
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [task.id]: task
    }
  };
}
