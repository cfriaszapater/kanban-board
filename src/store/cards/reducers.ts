import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE
} from "./fetchBoardActions";
import { CardsActionsTypes } from "./CardsActionsTypes";
import {
  CREATE_CARD_BEGIN,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAILURE
} from "./createCardActions";
import { KanbanBoardState, Card } from "./types";
import {
  createCardBegin,
  createCardFailure,
  createCardSuccess
} from "./createCardReducer";
import {
  beginCardEditing,
  changeCardEditing,
  updateCardBegin,
  deleteCardBegin
} from "./updateCardReducer";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  DELETE_CARD_BEGIN
} from "./updateCardActions";
import {
  DRAG_CARD_WITHIN_COLUMN_BEGIN,
  DRAG_CARD_BETWEEN_COLUMNS_BEGIN,
  DRAG_CARD_FAILURE
} from "./dragCardActions";
import { dragCardWithinColumnBegin } from "./dragCardReducer";

export const initialState: KanbanBoardState = {
  cards: {},
  // XXX columns can be [] in initialState
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      cardIds: []
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      cardIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      cardIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  loading: false,
  error: null
};

export function cardsReducer(
  state: KanbanBoardState = initialState,
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
        cards: action.payload.cards,
        columns: action.payload.columns,
        columnOrder: action.payload.columnOrder
      };

    case FETCH_CARDS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        cards: {},
        columns: {},
        columnOrder: []
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
