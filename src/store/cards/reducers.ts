import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  MOVE_WITHIN_COLUMN,
  CardsActionsTypes
} from "./actions";
import { KanbanBoardState } from './types';

const initialState: KanbanBoardState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  loading: false,
  error: null
};

export default function cardsReducer (
  state = initialState,
  action: CardsActionsTypes
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
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn
          }
        };
        return newState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
