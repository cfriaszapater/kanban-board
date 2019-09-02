import { KanbanBoardState } from "./types";
import { MoveCardWithinColumnBeginAction } from "./dragCardActions";

export function moveCardWithinColumnBegin(
  action: MoveCardWithinColumnBeginAction,
  state: KanbanBoardState
) {
  let updatedColumn = action.updatedColumn;
  return {
    ...state,
    columns: {
      ...state.columns,
      [updatedColumn.id]: updatedColumn
    }
  };
}
