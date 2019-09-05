import { Card, Column, NameToColumnMap } from "./types";

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
  _id?: string;
}

export interface Card {
  id: string;
  content: string;
  loading?: boolean;
  error?: boolean;
  editing?: boolean;
  _id?: string;
}

export interface CardLoading extends Card {
  loading: true;
}

export interface CardLoaded extends Card {
  loading: false;
  _id: string;
}

export interface CardErrorLoading extends Card {
  loading: false;
  error: true;
}

export interface NameToCardMap {
  [key: string]: Card;
}

export interface NameToColumnMap {
  [key: string]: Column;
}

export interface Board {
  cards: NameToCardMap;
  columns: NameToColumnMap;
  columnOrder: string[];
}

export interface KanbanBoardState extends Board {
  loading: boolean;
  error: Error | null;
}

export interface User {
  username: string;
  password: string;
}

export interface Alert {
  message?: string;
  type?: string;
}
