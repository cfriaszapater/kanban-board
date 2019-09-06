import { givenColumnWithCards } from "../../../testUtil/givenColumnWithCards";
import { boardReducer, initialState } from "./boardReducer";
import { stateAfterOneCreate } from "./createCardReducer.spec";
import { Card, Column, KanbanBoardState } from "./types";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  DELETE_CARD_BEGIN,
  UPDATE_CARD_BEGIN
} from "./updateCardActions";

describe("card update (editing) reducer", () => {
  it("should start editing in card on START_TASK_EDITING", () => {
    const previousCard: Card = { id: "card-1234", content: "An easy card" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousCard
    );

    const resultState: KanbanBoardState = boardReducer(previousState, {
      card: previousCard,
      editing: true,
      type: BEGIN_TASK_EDITING
    });

    expect(resultState).toEqual({
      ...previousState,
      cards: {
        ...previousState.cards,
        [previousCard.id]: { ...previousCard, editing: true }
      }
    });
  });

  it("should update card with new content on CHANGE_TASK_EDITING", () => {
    const previousCard: Card = {
      content: "An easy card",
      editing: true,
      id: "card-1234"
    };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousCard
    );

    const newContent = "condemor!";
    const resultState: KanbanBoardState = boardReducer(previousState, {
      card: previousCard,
      newContent,
      type: CHANGE_TASK_EDITING
    });

    expect(resultState).toEqual({
      ...previousState,
      cards: {
        ...previousState.cards,
        [previousCard.id]: {
          ...previousCard,
          content: newContent,
          editing: true
        }
      }
    });
  });

  it("should update card on UPDATE_CARD_BEGIN", () => {
    const previousCard: Card = { id: "card-1234", content: "An easy card" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousCard
    );

    const newContent = "jarl!";
    const cardWithUpdatedContent: Card = {
      ...previousCard,
      content: newContent,
      editing: false
    };
    const resultState: KanbanBoardState = boardReducer(previousState, {
      card: cardWithUpdatedContent,
      type: UPDATE_CARD_BEGIN
    });

    expect(resultState).toEqual({
      ...previousState,
      cards: {
        ...previousState.cards,
        [previousCard.id]: {
          ...previousCard,
          content: newContent,
          editing: false
        }
      }
    });
  });

  it("given column with cards, when BEGIN delete, then deleted card and removed from column", () => {
    const column1: Column = givenColumnWithCards("be-col-1", "col-1");
    const card1: Card = {
      _id: "grmblf-1",
      content: "I fear being deleted",
      id: "card-1"
    };
    const card2: Card = {
      _id: "grmblf-2",
      content: "I fear being deleted 2",
      id: "card-2"
    };
    const column2: Column = givenColumnWithCards(
      "be-col-2",
      "col-2",
      card1.id,
      card2.id
    );
    const column3: Column = givenColumnWithCards(
      "be-col-3",
      "col-3",
      "card-42"
    );
    const givenState: KanbanBoardState = {
      cards: {
        [card1.id]: card1,
        [card2.id]: card2,
        ["card-42"]: { id: "card-42", content: "jarl" }
      },
      columnOrder: [column2.id, column2.id],
      columns: {
        [column1.id]: column1,
        [column2.id]: column2,
        [column3.id]: column3
      },
      error: null,
      loading: false
    };

    const resultState: KanbanBoardState = boardReducer(givenState, {
      card: card1,
      type: DELETE_CARD_BEGIN
    });

    const column2WithoutCard2 = { ...column2, cardIds: [card2.id] };
    expect(resultState).toEqual({
      ...givenState,
      cards: {
        [card2.id]: card2,
        ["card-42"]: { id: "card-42", content: "jarl" }
      },
      columns: { ...givenState.columns, [column2.id]: column2WithoutCard2 }
    });
  });
});
