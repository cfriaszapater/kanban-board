import { Card, Column, KanbanBoardState } from "../src/store/board/types";
import { givenColumnWithCards } from "./givenColumnWithCards";
import { AppState } from "../src/store";
import { initialState as registerInitialState } from "../src/store/register/registerReducer";

export function givenKanbanBoardStateWithSomeCards() {
  const column1: Column = givenColumnWithCards("be-col-1", "col-1");
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
  const column2: Column = givenColumnWithCards(
    "be-col-2",
    "col-2",
    card1.id,
    card2.id
  );
  const column3: Column = givenColumnWithCards("be-col-3", "col-3", "card-42");
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
  return givenState;
}

export function givenAppStateWithSomeCards(): AppState {
  const boardState = givenKanbanBoardStateWithSomeCards();
  return {
    board: boardState,
    login: { loggedIn: true, user: "jarl" },
    alert: {},
    register: registerInitialState
  };
}
