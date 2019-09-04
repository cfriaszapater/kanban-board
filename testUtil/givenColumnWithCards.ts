import { Column } from "../src/store/cards/types";

export function givenColumnWithCards(
  columnBackendId: string,
  columnId: string = "col-1",
  ...cardIds: string[]
): Column {
  return {
    _id: columnBackendId,
    id: columnId,
    title: "a column",
    cardIds: cardIds
  };
}
