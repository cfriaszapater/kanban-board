import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardActions,
  DeleteCardBeginAction
} from "./updateCardActions.js";
import { CreateCardActions } from "./createCardActions.js";
import {
  DragCardWithinColumnBeginAction,
  DragCardFailureAction,
  DragCardBetweenColumnsBeginAction
} from "./dragCardActions";
import {
  FetchCardsBeginAction,
  FetchCardsSuccessAction,
  FetchCardsFailureAction
} from "./fetchBoardActions";

export type CardsActionsTypes =
  | FetchCardsBeginAction
  | FetchCardsSuccessAction
  | FetchCardsFailureAction
  | DragCardWithinColumnBeginAction
  | DragCardFailureAction
  | DragCardBetweenColumnsBeginAction
  | CreateCardActions
  | BeginCardEditingAction
  | ChangeCardEditingAction
  | UpdateCardActions
  | DeleteCardBeginAction;
