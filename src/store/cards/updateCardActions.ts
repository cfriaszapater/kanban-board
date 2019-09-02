import { Card } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../backendUrl";
import { put } from "../../util/fetchJson";

export const BEGIN_TASK_EDITING = "BEGIN_TASK_EDITING";
export const CHANGE_TASK_EDITING = "CHANGE_TASK_EDITING";
export const UPDATE_CARD_BEGIN = "UPDATE_CARD_BEGIN";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export interface BeginCardEditingAction {
  type: typeof BEGIN_TASK_EDITING;
  card: Card;
  editing: true;
}

export interface ChangeCardEditingAction {
  type: typeof CHANGE_TASK_EDITING;
  card: Card;
  newContent: string;
}

export interface UpdateCardBeginAction {
  type: typeof UPDATE_CARD_BEGIN;
  card: Card;
}

export interface UpdateCardSuccessAction {
  type: typeof UPDATE_CARD_SUCCESS;
  card: Card;
}

export interface UpdateCardFailureAction {
  type: typeof UPDATE_CARD_FAILURE;
  card: Card;
}

export function beginCardEditing(card: Card): BeginCardEditingAction {
  return {
    type: BEGIN_TASK_EDITING,
    card: card,
    editing: true
  };
}

export function changeCardEditing(
  card: Card,
  newContent: string
): ChangeCardEditingAction {
  return {
    type: CHANGE_TASK_EDITING,
    card: card,
    newContent: newContent
  };
}

export function updateCardBegin(
  card: Card,
  newContent: string
): UpdateCardBeginAction {
  const cardWithUpdatedContent: Card = {
    ...card,
    content: newContent,
    editing: false
  };

  return {
    type: UPDATE_CARD_BEGIN,
    card: cardWithUpdatedContent
  };
}

export type UpdateCardActions =
  | UpdateCardBeginAction
  | UpdateCardSuccessAction
  | UpdateCardFailureAction;

export const updateCard = (card: Card, newContent: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<UpdateCardActions> => {
  if (typeof card._id === "undefined") {
    throw new Error(
      "Cannot update because this card's create has not yet finished" + card
    );
  }
  const updateCardBeginAction = dispatch(updateCardBegin(card, newContent));
  const cardWithNewContent = updateCardBeginAction.card;
  try {
    put(backendUrl() + "/cards/" + cardWithNewContent._id, cardWithNewContent);
    return dispatch(updateCardSuccess(cardWithNewContent));
  } catch (ex) {
    return dispatch(updateCardFailure(cardWithNewContent, ex));
  }
};

function updateCardSuccess(card: Card): UpdateCardSuccessAction {
  return {
    type: UPDATE_CARD_SUCCESS,
    card: card
  };
}

function updateCardFailure(card: Card, error: Error): UpdateCardFailureAction {
  console.log(error);
  return {
    type: UPDATE_CARD_FAILURE,
    card: card
  };
}
