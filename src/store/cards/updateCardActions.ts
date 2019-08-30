import { Task } from "./types";
import { ThunkDispatch } from "redux-thunk";

export const BEGIN_TASK_EDITING = "BEGIN_TASK_EDITING";
export const CHANGE_TASK_EDITING = "CHANGE_TASK_EDITING";
export const UPDATE_CARD_BEGIN = "UPDATE_CARD_BEGIN";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export interface BeginTaskEditingAction {
  type: typeof BEGIN_TASK_EDITING;
  task: Task;
  editing: true;
}

export interface ChangeTaskEditingAction {
  type: typeof CHANGE_TASK_EDITING;
  task: Task;
  newContent: string;
}

export interface UpdateCardBeginAction {
  type: typeof UPDATE_CARD_BEGIN;
  task: Task;
}

export interface UpdateCardSuccessAction {
  type: typeof UPDATE_CARD_SUCCESS;
  task: Task;
}

export interface UpdateCardFailureAction {
  type: typeof UPDATE_CARD_FAILURE;
  task: Task;
}

export function beginTaskEditing(task: Task): BeginTaskEditingAction {
  return {
    type: BEGIN_TASK_EDITING,
    task: task,
    editing: true
  };
}

export function changeTaskEditing(
  task: Task,
  newContent: string
): ChangeTaskEditingAction {
  return {
    type: CHANGE_TASK_EDITING,
    task: task,
    newContent: newContent
  };
}

export function updateCardBegin(
  task: Task,
  newContent: string
): UpdateCardBeginAction {
  const taskWithUpdatedContent: Task = {
    ...task,
    content: newContent,
    editing: false
  };

  return {
    type: UPDATE_CARD_BEGIN,
    task: taskWithUpdatedContent
  };
}

export type UpdateCardActions =
  | UpdateCardBeginAction
  | UpdateCardSuccessAction
  | UpdateCardFailureAction;

export const updateCard = (card: Task, newContent: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<UpdateCardActions> => {
  if (typeof card._id === "undefined") {
    throw new Error(
      "Cannot update because this card's create has not yet finished" + card
    );
  }
  const updateCardBeginAction = dispatch(updateCardBegin(card, newContent));
  const cardWithNewContent = updateCardBeginAction.task;
  try {
    const req = new Request(
      "http://localhost:8080/cards/" + cardWithNewContent._id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cardWithNewContent)
      }
    );
    const res = await fetch(req);
    if (!res.ok) {
      throw new Error("Response not OK: " + res);
    }
    return dispatch(updateCardSuccess(cardWithNewContent));
  } catch (ex) {
    return dispatch(updateCardFailure(cardWithNewContent, ex));
  }
};

function updateCardSuccess(card: Task): UpdateCardSuccessAction {
  return {
    type: UPDATE_CARD_SUCCESS,
    task: card
  };
}

function updateCardFailure(card: Task, error: Error): UpdateCardFailureAction {
  console.log(error);
  return {
    type: UPDATE_CARD_FAILURE,
    task: card
  };
}
