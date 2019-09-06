import { DragCardWithinColumnBeginAction } from "./dragCardActions";
import { KanbanBoardState } from "./types";

export function dragCardWithinColumnBegin(
  action: DragCardWithinColumnBeginAction,
  state: KanbanBoardState
) {
  const updatedColumn = action.column;
  return {
    ...state,
    columns: {
      ...state.columns,
      [updatedColumn.id]: updatedColumn
    }
  };
}
