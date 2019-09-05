import { KanbanBoardState } from "./types";
import { DragCardWithinColumnBeginAction } from "./dragCardActions";

export function dragCardWithinColumnBegin(
  action: DragCardWithinColumnBeginAction,
  state: KanbanBoardState
) {
  let updatedColumn = action.column;
  return {
    ...state,
    columns: {
      ...state.columns,
      [updatedColumn.id]: updatedColumn
    }
  };
}
