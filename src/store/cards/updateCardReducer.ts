import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardBeginAction
} from "./updateCardActions";
import { KanbanBoardState, Card } from "./types";
import { stateWithUpdatedCard } from "./reducers";

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
