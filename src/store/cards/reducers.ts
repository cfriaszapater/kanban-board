import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  CardsActionsTypes
} from "./fetchBoardActions";
import {
  CreateCardActions,
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
  updateCardBegin
} from "./updateCardReducer";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  UPDATE_CARD_BEGIN
} from "./updateCardActions";
import {
  MOVE_CARD_WITHIN_COLUMN_BEGIN,
  MOVE_BETWEEN_COLUMNS
} from "./dragCardActions";

export const initialState: KanbanBoardState = {
  cards: {},
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

    case MOVE_CARD_WITHIN_COLUMN_BEGIN:
      let updatedColumn = action.updatedColumn;
      return {
        ...state,
        columns: {
          ...state.columns,
          [updatedColumn.id]: updatedColumn
        }
      };

    case MOVE_BETWEEN_COLUMNS:
      const startCardIds = Array.from(action.startCol.cardIds);
      startCardIds.splice(action.source.index, 1);
      const newStartCol = {
        ...action.startCol,
        cardIds: startCardIds
      };
      const endCardIds = Array.from(action.endCol.cardIds);
      endCardIds.splice(action.destination.index, 0, action.draggableId);
      const newEndCol = {
        ...action.endCol,
        cardIds: endCardIds
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
