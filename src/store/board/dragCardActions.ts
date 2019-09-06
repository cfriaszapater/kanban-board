import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../util/backendUrl";
import { put } from "../../util/fetchJson";
import { Column } from "./types";

export const DRAG_CARD_WITHIN_COLUMN_BEGIN = "DRAG_CARD_WITHIN_COLUMN_BEGIN";
export const DRAG_CARD_FAILURE = "DRAG_CARD_FAILURE";
export const DRAG_CARD_BETWEEN_COLUMNS_BEGIN =
  "DRAG_CARD_BETWEEN_COLUMNS_BEGIN";

export interface DragCardWithinColumnBeginAction {
  type: typeof DRAG_CARD_WITHIN_COLUMN_BEGIN;
  column: Column;
}

export interface DragCardFailureAction {
  type: typeof DRAG_CARD_FAILURE;
  error: Error;
}

export interface DragCardBetweenColumnsBeginAction {
  type: typeof DRAG_CARD_BETWEEN_COLUMNS_BEGIN;
  startColumn: Column;
  endColumn: Column;
}

export async function dragCardWithinColumn(
  column: Column,
  sourceIndex: number,
  destinationIndex: number,
  draggableCardId: string,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void | DragCardFailureAction> {
  const newCardIds = Array.from(column.cardIds);
  newCardIds.splice(sourceIndex, 1);
  newCardIds.splice(destinationIndex, 0, draggableCardId);
  const updatedColumn = {
    ...column,
    cardIds: newCardIds
  };
  dispatch(dragCardWithinColumnBegin(updatedColumn));
  try {
    await updateColumn(updatedColumn);
    // Nothing else to do on success, so no "success" dispatched action
    return;
  } catch (error) {
    return dispatch(dragCardWithinColumnFailure(error));
  }
}

function dragCardWithinColumnBegin(
  updatedColumn: Column
): DragCardWithinColumnBeginAction {
  return {
    column: updatedColumn,
    type: DRAG_CARD_WITHIN_COLUMN_BEGIN
  };
}

function dragCardWithinColumnFailure(error: Error): DragCardFailureAction {
  console.log(error);
  return {
    error,
    type: DRAG_CARD_FAILURE
  };
}

async function updateColumn(updatedColumn: Column) {
  return put(backendUrl() + "/columns/" + updatedColumn._id, updatedColumn);
}

export async function dragCardBetweenColumns(
  startCol: Column,
  endCol: Column,
  sourceIndex: number,
  destinationIndex: number,
  draggableId: string,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void | DragCardFailureAction> {
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
  dispatch(dragCardBetweenColumnsBegin(updatedStartCol, updatedEndCol));
  try {
    await updateColumn(updatedStartCol);
    await updateColumn(updatedEndCol);
    // Nothing else to do on success, so no "success" dispatched action
    return;
  } catch (error) {
    return dispatch(dragCardWithinColumnFailure(error));
  }
}

function dragCardBetweenColumnsBegin(
  startCol: Column,
  endCol: Column
): DragCardBetweenColumnsBeginAction {
  return {
    endColumn: endCol,
    startColumn: startCol,
    type: DRAG_CARD_BETWEEN_COLUMNS_BEGIN
  };
}
