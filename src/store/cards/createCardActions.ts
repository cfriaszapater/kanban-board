import { Card, CardLoaded } from "./types";
import { ThunkDispatch } from "redux-thunk";

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
    const createdCard = await post(card);
    return dispatch(createCardSuccess(createdCard));
  } catch (ex) {
    return dispatch(createCardFailure(card, ex));
  }
};

async function post(card: Card) {
  const req = new Request("http://localhost:8080/cards", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(card)
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error("Could not create card, response KO: " + res);
  }
  const createdCard = await res.json();
  return createdCard;
}

function createCardBegin(card: Card): CreateCardBeginAction {
  return {
    type: CREATE_CARD_BEGIN,
    payload: card
  };
}

function createCardSuccess(createdCard: CardLoaded): CreateCardSuccessAction {
  return {
    type: CREATE_CARD_SUCCESS,
    payload: createdCard
  };
}

function createCardFailure(card: Card, error: Error): CreateCardFailureAction {
  console.log(error);
  return {
    type: CREATE_CARD_FAILURE,
    payload: card
  };
}
