import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardActions
} from "./updateCardActions.js";
import { CreateCardActions } from "./createCardActions.js";
import {
  MoveCardWithinColumnBeginAction,
  MoveCardFailureAction,
  MoveCardBetweenColumnsBeginAction
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
  | MoveCardWithinColumnBeginAction
  | MoveCardFailureAction
  | MoveCardBetweenColumnsBeginAction
  | CreateCardActions
  | BeginCardEditingAction
  | ChangeCardEditingAction
  | UpdateCardActions;
