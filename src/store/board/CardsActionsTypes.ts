import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardActions,
  DeleteCardBeginAction
} from "./updateCardActions";
import { CreateCardActions } from "./createCardActions";
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
