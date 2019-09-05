import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardBeginAction,
  DeleteCardBeginAction
} from "./updateCardActions";
import { KanbanBoardState, Card } from "./types";
import { stateWithUpdatedCard } from "./boardReducer";
import { columnsWithoutCard, cardsWithoutCard } from "./kanbanBoardState";

export function beginCardEditing(
  action: BeginCardEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const cardWithEditingEnabled: Card = {
    ...action.card,
    editing: action.editing
  };
  return stateWithUpdatedCard(state, cardWithEditingEnabled);
}

export function changeCardEditing(
  action: ChangeCardEditingAction,
  state: KanbanBoardState
): KanbanBoardState {
  const cardWithUpdatedContent: Card = {
    ...action.card,
    content: action.newContent,
    editing: true
  };
  return stateWithUpdatedCard(state, cardWithUpdatedContent);
}

export function updateCardBegin(
  action: UpdateCardBeginAction,
  state: KanbanBoardState
): KanbanBoardState {
  return stateWithUpdatedCard(state, action.card);
}

export function deleteCardBegin(
  action: DeleteCardBeginAction,
  state: KanbanBoardState
): KanbanBoardState {
  const columns = state.columns;
  const cards = state.cards;
  const card = action.card;
  const updatedColumns = columnsWithoutCard(columns, card, state);
  const updatedCards = cardsWithoutCard(cards, card);
  return {
    ...state,
    columns: updatedColumns,
    cards: updatedCards
  };
}
