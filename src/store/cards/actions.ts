import { Column, Board, Task, NameToTaskMap, NameToColumnMap } from "./types";
import { DraggableLocation, DraggableId } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import {
  BeginTaskEditingAction,
  ChangeTaskEditingAction,
  UpdateCardActions
} from "./updateCardActions.js";
import { CreateCardActions } from "./createCardActions.js";

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
  | BeginTaskEditingAction
  | ChangeTaskEditingAction
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
  const cards: Task[] = await getCards();
  const columns: Column[] = await getColumns();

  const taskMap: NameToTaskMap = {};
  cards.forEach(card => {
    taskMap[card.id] = card;
  });
  const columnMap: NameToColumnMap = {};
  columns.forEach(column => {
    columnMap[column.id] = column;
  });
  return {
    tasks: taskMap,
    columns: columnMap,
    columnOrder: Object.keys(columnMap)
  };
}

async function getCards() {
  return await get("http://localhost:8080/cards");
}

async function getColumns() {
  return await get("http://localhost:8080/columns");
}

async function get(url: string) {
  const req = new Request(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error("Could not update card, response KO: " + res);
  }
  return await res.json();
}

export function moveWithinSameColumn(
  startCol: Column,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: DraggableId
): MoveWithinColumnAction {
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
