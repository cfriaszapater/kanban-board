import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../util/backendUrl";
import { post } from "../../util/fetchJson";
import { Card, CardLoaded } from "./types";

export const CREATE_CARD_BEGIN = "CREATE_CARD_BEGIN";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE";

export interface CreateCardBeginAction {
  type: typeof CREATE_CARD_BEGIN;
  payload: Card;
}

export interface CreateCardSuccessAction {
  type: typeof CREATE_CARD_SUCCESS;
  payload: CardLoaded;
}

export interface CreateCardFailureAction {
  type: typeof CREATE_CARD_FAILURE;
  payload: Card;
  error: Error;
}

export type CreateCardActions =
  | CreateCardBeginAction
  | CreateCardSuccessAction
  | CreateCardFailureAction;

export const createCard = (card: Card) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<CreateCardActions> => {
  dispatch(createCardBegin(card));
  try {
    const createdCard = await post(backendUrl() + "/cards", card);
    return dispatch(createCardSuccess({ ...createdCard, loading: false }));
  } catch (ex) {
    return dispatch(createCardFailure(card, ex));
  }
};

function createCardBegin(card: Card): CreateCardBeginAction {
  return {
    payload: card,
    type: CREATE_CARD_BEGIN
  };
}

function createCardSuccess(createdCard: CardLoaded): CreateCardSuccessAction {
  return {
    payload: createdCard,
    type: CREATE_CARD_SUCCESS
  };
}

function createCardFailure(card: Card, error: Error): CreateCardFailureAction {
  console.log(error);
  return {
    error,
    payload: card,
    type: CREATE_CARD_FAILURE
  };
}
