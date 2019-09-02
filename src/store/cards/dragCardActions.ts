import { Column } from "./types";
import { DraggableLocation, DraggableId } from "react-beautiful-dnd";
import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../util/backendUrl";
import { put } from "../../util/fetchJson";

export const MOVE_CARD_WITHIN_COLUMN_BEGIN = "MOVE_CARD_WITHIN_COLUMN_BEGIN";
export const MOVE_CARD_WITHIN_COLUMN_FAILURE =
  "MOVE_CARD_WITHIN_COLUMN_FAILURE";
export const MOVE_BETWEEN_COLUMNS = "MOVE_BETWEEN_COLUMNS";

export interface MoveCardWithinColumnBeginAction {
  type: typeof MOVE_CARD_WITHIN_COLUMN_BEGIN;
  updatedColumn: Column;
}

export interface MoveWithinColumnFailureAction {
  type: typeof MOVE_CARD_WITHIN_COLUMN_FAILURE;
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
): MoveCardWithinColumnBeginAction {
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
    type: MOVE_CARD_WITHIN_COLUMN_FAILURE,
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
