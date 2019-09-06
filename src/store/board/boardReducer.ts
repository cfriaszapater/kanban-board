import { CardsActionsTypes } from "./CardsActionsTypes";
import {
  CREATE_CARD_BEGIN,
  CREATE_CARD_FAILURE,
  CREATE_CARD_SUCCESS
} from "./createCardActions";
import {
  createCardBegin,
  createCardFailure,
  createCardSuccess
} from "./createCardReducer";
import {
  DRAG_CARD_BETWEEN_COLUMNS_BEGIN,
  DRAG_CARD_FAILURE,
  DRAG_CARD_WITHIN_COLUMN_BEGIN
} from "./dragCardActions";
import { dragCardWithinColumnBegin } from "./dragCardReducer";
import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_FAILURE,
  FETCH_CARDS_SUCCESS
} from "./fetchBoardActions";
import { Card, KanbanBoardState } from "./types";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  DELETE_CARD_BEGIN,
  UPDATE_CARD_BEGIN
} from "./updateCardActions";
import {
  beginCardEditing,
  changeCardEditing,
  deleteCardBegin,
  updateCardBegin
} from "./updateCardReducer";

export const initialState: KanbanBoardState = {
  cards: {},
  // XXX columns can be [] in initialState
  columnOrder: ["column-1", "column-2", "column-3"],
  columns: {
    "column-1": {
      cardIds: [],
      id: "column-1",
      title: "To do"
    },
    "column-2": {
      cardIds: [],
      id: "column-2",
      title: "In progress"
    },
    "column-3": {
      cardIds: [],
      id: "column-3",
      title: "Done"
    }
  },
  error: null,
  loading: false
};

export function boardReducer(
  state: KanbanBoardState = initialState,
  action: CardsActionsTypes
) {
  switch (action.type) {
    case FETCH_CARDS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        error: null,
        loading: true
      };

    case FETCH_CARDS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        cards: action.payload.cards,
        columnOrder: action.payload.columnOrder,
        columns: action.payload.columns,
        loading: false
      };

    case FETCH_CARDS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      return {
        ...state,
        cards: {},
        columnOrder: [],
        columns: {},
        error: action.error,
        loading: false
      };

    case DRAG_CARD_WITHIN_COLUMN_BEGIN:
      return dragCardWithinColumnBegin(action, state);

    case DRAG_CARD_BETWEEN_COLUMNS_BEGIN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.startColumn.id]: action.startColumn,
          [action.endColumn.id]: action.endColumn
        }
      };

    case CREATE_CARD_BEGIN:
      return createCardBegin(action, state);

    case CREATE_CARD_SUCCESS:
      return createCardSuccess(action, state);

    case CREATE_CARD_FAILURE:
      return createCardFailure(action, state);

    case BEGIN_TASK_EDITING:
      return beginCardEditing(action, state);

    case CHANGE_TASK_EDITING:
      return changeCardEditing(action, state);

    case UPDATE_CARD_BEGIN:
      return updateCardBegin(action, state);

    case DELETE_CARD_BEGIN:
      return deleteCardBegin(action, state);

    case DRAG_CARD_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

export function stateWithUpdatedCard(
  state: KanbanBoardState,
  cardToUpdate: Card
): KanbanBoardState {
  return {
    ...state,
    cards: {
      ...state.cards,
      [cardToUpdate.id]: cardToUpdate
    }
  };
}
