import {
  Card,
  Column,
  NameToColumnMap,
  KanbanBoardState,
  NameToCardMap
} from "./types";

export function columnWithoutCard(column: Column, card: Card) {
  const newCardIds = Array.from(column.cardIds);
  newCardIds.splice(newCardIds.indexOf(card.id), 1);
  const updatedColumn = {
    ...column,
    cardIds: newCardIds
  };
  return updatedColumn;
}

export function columnsWithoutCard(
  columns: NameToColumnMap,
  card: Card,
  state: KanbanBoardState
) {
  let column = columnContainingCard(columns, card);
  const updatedColumn = columnWithoutCard(column, card);
  const updatedColumns = {
    ...state.columns,
    [updatedColumn.id]: updatedColumn
  };
  return updatedColumns;
}

export function cardsWithoutCard(cards: NameToCardMap, card: Card) {
  const updatedCards = { ...cards };
  delete updatedCards[card.id];
  return updatedCards;
}

export function columnContainingCard(
  columns: NameToColumnMap,
  card: Card
): Column {
  const columnKeys = Object.keys(columns);

  for (let i = 0; i < columnKeys.length; i++) {
    const columnId = columnKeys[i];
    if (columns[columnId].cardIds.includes(card.id)) {
      return columns[columnId];
    }
  }
  throw new Error("No column contains card with id " + card.id);
}
