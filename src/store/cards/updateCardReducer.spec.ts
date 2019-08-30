import { cardsReducer, initialState } from "./reducers";
import { KanbanBoardState, Card } from "./types";
import {
  BEGIN_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  CHANGE_TASK_EDITING
} from "./updateCardActions";
import { stateAfterOneCreate } from "./createCardReducer.spec";

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
});
