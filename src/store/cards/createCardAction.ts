import { Task } from "./types";
import { ThunkDispatch } from "redux-thunk";

export const CREATE_CARD_BEGIN = "CREATE_CARD_BEGIN";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE";

export interface CreateCardBeginAction {
  type: typeof CREATE_CARD_BEGIN;
  payload: Task;
}

export interface CreateCardSuccessAction {
  type: typeof CREATE_CARD_SUCCESS;
  payload: Task;
}

export interface CreateCardFailureAction {
  type: typeof CREATE_CARD_FAILURE;
  error: Error | null;
}

export type CreateCardActions =
  | CreateCardBeginAction
  | CreateCardSuccessAction
  | CreateCardFailureAction;

export const createCard = (card: Task) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<CreateCardActions> => {
  dispatch(createCardBegin(card));
  try {
    // TODO POST /cards
    const req = new Request("http://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(card)
    });
    const res = await fetch(req);
    // XXX When "POST /cards", remove ".json"
    const createdCard = (await res.json()).json;
    return dispatch(createCardSuccess(createdCard));
  } catch (ex) {
    return dispatch(createCardFailure(ex));
  }
};

function createCardBegin(card: Task): CreateCardBeginAction {
  return {
    type: CREATE_CARD_BEGIN,
    payload: card
  };
}

function createCardSuccess(createdCard: Task): CreateCardSuccessAction {
  return {
    type: CREATE_CARD_SUCCESS,
    payload: createdCard
  };
}

function createCardFailure(error: Error): CreateCardFailureAction {
  return {
    type: CREATE_CARD_FAILURE,
    error: error
  };
}
