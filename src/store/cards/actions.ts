import { Column, Board, Card, NameToCardMap, NameToColumnMap } from "./types";
import { DraggableLocation, DraggableId } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import {
  BeginCardEditingAction,
  ChangeCardEditingAction,
  UpdateCardActions
} from "./updateCardActions.js";
import { CreateCardActions } from "./createCardActions.js";
import { backendUrl } from "../../backendUrl";
import { get } from "../../util/fetchJson";

export const FETCH_CARDS_BEGIN = "FETCH_CARDS_BEGIN";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";
export const MOVE_WITHIN_COLUMN = "MOVE_WITHIN_COLUMN";
export const MOVE_BETWEEN_COLUMNS = "MOVE_BETWEEN_COLUMNS";

export type CardsActionsTypes =
  | FetchCardsBeginAction
  | FetchCardsSuccessAction
  | FetchCardsFailureAction
  | MoveWithinColumnAction
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

export interface MoveWithinColumnAction {
  type: typeof MOVE_WITHIN_COLUMN;
  startCol: Column;
  source: DraggableLocation;
  destination: DraggableLocation;
  draggableId: DraggableId;
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

export function moveWithinSameColumn(
  startCol: Column,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: DraggableId
): MoveWithinColumnAction {
  // TODO PUT /columns
  return {
    type: MOVE_WITHIN_COLUMN,
    startCol: startCol,
    source: source,
    destination: destination,
    draggableId: draggableId
  };
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
