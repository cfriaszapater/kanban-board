import { boardReducer, initialState } from "./boardReducer";
import { addCardToState } from "./createCardReducer";
import {
  DRAG_CARD_WITHIN_COLUMN_BEGIN,
  DragCardWithinColumnBeginAction
} from "./dragCardActions";
import { Card, KanbanBoardState } from "./types";

describe("drag card reducer", () => {
  it("given cards in first column, when drag card within column, then first column cardIds updated", () => {
    const card1: Card = { id: "card-1", content: "An easy card" };
    const card2: Card = { id: "card-2", content: "A medium card" };
    const givenState: KanbanBoardState = addCardToState(
      addCardToState(initialState, card1),
      card2
    );
    const givenFirstColumn =
      givenState.columns[Object.keys(givenState.columns)[0]];
    expect(givenFirstColumn.cardIds).toEqual([card1.id, card2.id]);

    const columnWithSwappedCardIds = {
      ...givenFirstColumn,
      cardIds: [card2.id, card1.id]
    };
    const action: DragCardWithinColumnBeginAction = {
      type: DRAG_CARD_WITHIN_COLUMN_BEGIN,
      column: columnWithSwappedCardIds
    };
    const resultState = boardReducer(initialState, action);

    const resultFirstColumn =
      resultState.columns[Object.keys(resultState.columns)[0]];
    expect(resultFirstColumn).toEqual(columnWithSwappedCardIds);
  });
});
