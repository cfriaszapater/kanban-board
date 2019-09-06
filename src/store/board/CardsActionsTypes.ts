import { CreateCardActions } from "./createCardActions";
import {
  DragCardBetweenColumnsBeginAction,
  DragCardFailureAction,
  DragCardWithinColumnBeginAction
} from "./dragCardActions";
import {
  FetchCardsBeginAction,
  FetchCardsFailureAction,
  FetchCardsSuccessAction
} from "./fetchBoardActions";
import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  DeleteCardBeginAction,
  UpdateCardActions
} from "./updateCardActions";

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
