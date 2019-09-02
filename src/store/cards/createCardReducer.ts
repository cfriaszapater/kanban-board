import {
  CreateCardBeginAction,
  CreateCardFailureAction
} from "./createCardActions";
import {
  KanbanBoardState,
  CardLoading,
  CardLoaded,
  CardErrorLoading,
  Card
} from "./types";
import { CreateCardSuccessAction } from "./createCardActions";
import { stateWithUpdatedCard } from "./reducers";

export function createCardBegin(
  action: CreateCardBeginAction,
  state: KanbanBoardState
): KanbanBoardState {
  const card: CardLoading = { ...action.payload, loading: true };
  // Add Card to cards and add cardId to firstColumn.cardIds
  return addCardToState(state, card);
}

export function addCardToState(state: KanbanBoardState, card: Card) {
  const firstColumn = state.columns[Object.keys(state.columns)[0]];
  return {
    ...state,
    cards: { ...state.cards, [card.id]: card },
    columns: {
      ...state.columns,
      [firstColumn.id]: {
        ...state.columns[firstColumn.id],
        cardIds: [...state.columns[firstColumn.id].cardIds, card.id]
      }
    }
  };
}

export function createCardSuccess(
  action: CreateCardSuccessAction,
  state: KanbanBoardState
): KanbanBoardState {
  const cardLoaded: CardLoaded = { ...action.payload, loading: false };
  return stateWithUpdatedCard(state, cardLoaded);
}

export function createCardFailure(
  action: CreateCardFailureAction,
  state: KanbanBoardState
): KanbanBoardState {
  const cardWithErrorSet: CardErrorLoading = {
    ...action.payload,
    loading: false,
    error: true
  };
  return stateWithUpdatedCard(state, cardWithErrorSet);
}
