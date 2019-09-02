import { Column, Board, Card, NameToCardMap, NameToColumnMap } from "./types";
import { DraggableLocation, DraggableId } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardActions
} from "./updateCardActions.js";
import { CreateCardActions } from "./createCardActions.js";
import { backendUrl } from "../../util/backendUrl";
import { get, put } from "../../util/fetchJson";

export const FETCH_CARDS_BEGIN = "FETCH_CARDS_BEGIN";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";
export const MOVE_CARD_WITHIN_COLUMN_BEGIN = "MOVE_CARD_WITHIN_COLUMN_BEGIN";
export const MOVE_WITHIN_COLUMN_FAILURE = "MOVE_WITHIN_COLUMN_FAILURE";
export const MOVE_BETWEEN_COLUMNS = "MOVE_BETWEEN_COLUMNS";

export type CardsActionsTypes =
  | FetchCardsBeginAction
  | FetchCardsSuccessAction
  | FetchCardsFailureAction
  | MoveWithinColumnBeginAction
  | MoveBetweenColumnsAction
  | CreateCardActions
  | BeginCardEditingAction
  | ChangeCardEditingAction
  | UpdateCardActions;

export interface FetchCardsBeginAction {
  type: typeof FETCH_CARDS_BEGIN;
}

export interface FetchCardsSuccessAction {
  type: typeof FETCH_CARDS_SUCCESS;
  payload: Board;
}

export interface FetchCardsFailureAction {
  type: typeof FETCH_CARDS_FAILURE;
  error: Error | null;
}

export interface MoveWithinColumnBeginAction {
  type: typeof MOVE_CARD_WITHIN_COLUMN_BEGIN;
  updatedColumn: Column;
}

export interface MoveWithinColumnFailureAction {
  type: typeof MOVE_WITHIN_COLUMN_FAILURE;
  error: Error;
}

export interface MoveBetweenColumnsAction {
  type: typeof MOVE_BETWEEN_COLUMNS;
  startCol: Column;
  endCol: Column;
  source: DraggableLocation;
  destination: DraggableLocation;
  draggableId: DraggableId;
}

export const fetchBoard = () => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<FetchCardsSuccessAction | FetchCardsFailureAction> => {
  dispatch(fetchCardsBegin());
  try {
    const board: Board = await getBoard();
    return dispatch(fetchCardsSuccess(board));
  } catch (error) {
    return dispatch(fetchCardsFailure(error));
  }
};

async function getBoard(): Promise<Board> {
  const cards: Card[] = await getCards();
  const columns: Column[] = await getColumns();

  const cardMap: NameToCardMap = {};
  cards.forEach(card => {
    cardMap[card.id] = card;
  });
  const columnMap: NameToColumnMap = {};
  columns.forEach(column => {
    columnMap[column.id] = column;
  });
  return {
    cards: cardMap,
    columns: columnMap,
    columnOrder: Object.keys(columnMap)
  };
}

async function getCards() {
  return await get(backendUrl() + "/cards");
}

async function getColumns() {
  return await get(backendUrl() + "/columns");
}

export async function moveCardWithinColumn(
  startCol: Column,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: DraggableId,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void | MoveWithinColumnFailureAction> {
  const newCardIds = Array.from(startCol.cardIds);
  newCardIds.splice(source.index, 1);
  newCardIds.splice(destination.index, 0, draggableId);
  const updatedColumn = {
    ...startCol,
    cardIds: newCardIds
  };
  dispatch(moveCardWithinColumnBegin(updatedColumn));

  try {
    await updateColumn(updatedColumn);
    // Nothing else to do on success, so no "success" dispatched action
    return;
  } catch (error) {
    return dispatch(moveCardWithinColumnFailure(error));
  }
}

function moveCardWithinColumnBegin(
  updatedColumn: Column
): MoveWithinColumnBeginAction {
  return {
    type: MOVE_CARD_WITHIN_COLUMN_BEGIN,
    updatedColumn: updatedColumn
  };
}

function moveCardWithinColumnFailure(
  error: Error
): MoveWithinColumnFailureAction {
  const messageToDisplay = "Network error, please refresh: " + error.message;
  console.error(error);
  return {
    type: MOVE_WITHIN_COLUMN_FAILURE,
    error: { ...error, message: messageToDisplay }
  };
}

async function updateColumn(updatedColumn: Column) {
  return put(backendUrl() + "/columns/" + updatedColumn._id, updatedColumn);
}

export function moveBetweenColumns(
  startCol: Column,
  endCol: Column,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: DraggableId
) {
  // TODO PUT /columns
  return {
    type: MOVE_BETWEEN_COLUMNS,
    startCol: startCol,
    endCol: endCol,
    source: source,
    destination: destination,
    draggableId: draggableId
  };
}

export const fetchCardsBegin = (): FetchCardsBeginAction => ({
  type: FETCH_CARDS_BEGIN
});

export const fetchCardsSuccess = (cards: Board): FetchCardsSuccessAction => ({
  type: FETCH_CARDS_SUCCESS,
  payload: cards
});

export const fetchCardsFailure = (error: Error): FetchCardsFailureAction => ({
  type: FETCH_CARDS_FAILURE,
  error: error
});
