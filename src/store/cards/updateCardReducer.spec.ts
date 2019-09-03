import { cardsReducer, initialState } from "./reducers";
import { KanbanBoardState, Card, Column } from "./types";
import {
  BEGIN_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  CHANGE_TASK_EDITING,
  DELETE_CARD_BEGIN
} from "./updateCardActions";
import { stateAfterOneCreate } from "./createCardReducer.spec";
import { columnWithCards } from "../../../testUtil/columnWithCards";

describe("card update (editing) reducer", () => {
  it("should start editing in card on START_TASK_EDITING", () => {
    const previousCard: Card = { id: "card-1234", content: "An easy card" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousCard
    );

    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: BEGIN_TASK_EDITING,
      card: previousCard,
      editing: true
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
      id: "card-1234",
      content: "An easy card",
      editing: true
    };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousCard
    );

    const newContent = "condemor!";
    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: CHANGE_TASK_EDITING,
      card: previousCard,
      newContent: newContent
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
    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: UPDATE_CARD_BEGIN,
      card: cardWithUpdatedContent
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
    const column1: Column = columnWithCards("be-col-1", "col-1");
    const card1: Card = {
      id: "card-1",
      _id: "grmblf-1",
      content: "I fear being deleted"
    };
    const card2: Card = {
      id: "card-2",
      _id: "grmblf-2",
      content: "I fear being deleted 2"
    };
    const column2: Column = columnWithCards(
      "be-col-2",
      "col-2",
      card1.id,
      card2.id
    );
    const column3: Column = columnWithCards("be-col-3", "col-3", "card-42");
    const givenState: KanbanBoardState = {
      columns: {
        [column1.id]: column1,
        [column2.id]: column2,
        [column3.id]: column3
      },
      cards: {
        [card1.id]: card1,
        [card2.id]: card2,
        ["card-42"]: { id: "card-42", content: "jarl" }
      },
      columnOrder: [column2.id, column2.id],
      loading: false,
      error: null
    };

    const resultState: KanbanBoardState = cardsReducer(givenState, {
      type: DELETE_CARD_BEGIN,
      card: card1
    });

    const column2WithoutCard2 = { ...column2, cardIds: [card2.id] };
    expect(resultState).toEqual({
      ...givenState,
      columns: { ...givenState.columns, [column2.id]: column2WithoutCard2 },
      cards: {
        [card2.id]: card2,
        ["card-42"]: { id: "card-42", content: "jarl" }
      }
    });
  });
});
