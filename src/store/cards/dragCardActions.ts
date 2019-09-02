import { Column } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../util/backendUrl";
import { put } from "../../util/fetchJson";

export const MOVE_CARD_WITHIN_COLUMN_BEGIN = "MOVE_CARD_WITHIN_COLUMN_BEGIN";
export const MOVE_CARD_FAILURE = "MOVE_CARD_FAILURE";
export const MOVE_CARD_BETWEEN_COLUMNS_BEGIN =
  "MOVE_CARD_BETWEEN_COLUMNS_BEGIN";

export interface MoveCardWithinColumnBeginAction {
  type: typeof MOVE_CARD_WITHIN_COLUMN_BEGIN;
  column: Column;
}

export interface MoveCardFailureAction {
  type: typeof MOVE_CARD_FAILURE;
  error: Error;
}

export interface MoveCardBetweenColumnsBeginAction {
  type: typeof MOVE_CARD_BETWEEN_COLUMNS_BEGIN;
  startColumn: Column;
  endColumn: Column;
}

export async function moveCardWithinColumn(
  column: Column,
  sourceIndex: number,
  destinationIndex: number,
  draggableCardId: string,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void | MoveCardFailureAction> {
  const newCardIds = Array.from(column.cardIds);
  newCardIds.splice(sourceIndex, 1);
  newCardIds.splice(destinationIndex, 0, draggableCardId);
  const updatedColumn = {
    ...column,
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
): MoveCardWithinColumnBeginAction {
  return {
    type: MOVE_CARD_WITHIN_COLUMN_BEGIN,
    column: updatedColumn
  };
}

function moveCardWithinColumnFailure(error: Error): MoveCardFailureAction {
  console.log(error);
  return {
    type: MOVE_CARD_FAILURE,
    error: error
  };
}

async function updateColumn(updatedColumn: Column) {
  return put(backendUrl() + "/columns/" + updatedColumn._id, updatedColumn);
}

export async function moveCardBetweenColumns(
  startCol: Column,
  endCol: Column,
  sourceIndex: number,
  destinationIndex: number,
  draggableId: string,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void | MoveCardFailureAction> {
  const startCardIds = Array.from(startCol.cardIds);
  startCardIds.splice(sourceIndex, 1);
  const updatedStartCol = {
    ...startCol,
    cardIds: startCardIds
  };
  const endCardIds = Array.from(endCol.cardIds);
  endCardIds.splice(destinationIndex, 0, draggableId);
  const updatedEndCol = {
    ...endCol,
    cardIds: endCardIds
  };
  dispatch(moveCardBetweenColumnsBegin(updatedStartCol, updatedEndCol));
  try {
    await updateColumn(updatedStartCol);
    await updateColumn(updatedEndCol);
    // Nothing else to do on success, so no "success" dispatched action
    return;
  } catch (error) {
    return dispatch(moveCardWithinColumnFailure(error));
  }
}

function moveCardBetweenColumnsBegin(
  startCol: Column,
  endCol: Column
): MoveCardBetweenColumnsBeginAction {
  return {
    type: MOVE_CARD_BETWEEN_COLUMNS_BEGIN,
    startColumn: startCol,
    endColumn: endCol
  };
}
