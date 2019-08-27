import initialData from './initial-data.json';
import { IColumn, ITask } from './types';
import { DraggableLocation, DraggableId } from 'react-beautiful-dnd';

function fakeGetCards() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve(initialData),
      1000
    );
  });
}

export function fetchCards() {
  return (dispatch: any) => {
    dispatch(fetchCardsBegin());
    return fakeGetCards()
      .then((json: any) => {
        dispatch(fetchCardsSuccess(json.tasks, json.columns, json.columnOrder));
        // TODO return also columns and columnOrder?
        return json.tasks;
      })
      .catch(error =>
        dispatch(fetchCardsFailure(error))
      );
  };
}

export function moveWithinSameColumn(startCol: IColumn, source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId): MoveWithinColumnAction {
  return {
    type: MOVE_WITHIN_COLUMN,
    startCol: startCol,
    source: source,
    destination: destination,
    draggableId: draggableId
  };
}

// // Handle HTTP errors since fetch won't.
// function handleErrors(response: any) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }

interface FetchCardsBeginAction {
  type: typeof FETCH_CARDS_BEGIN
}

interface FetchCardsSuccessAction {
  type: typeof FETCH_CARDS_SUCCESS
  payload: IAppState
}

interface FetchCardsFailureAction {
  type: typeof FETCH_CARDS_FAILURE
  error: any
}

interface MoveWithinColumnAction {
  type: typeof MOVE_WITHIN_COLUMN
  startCol: IColumn;
  source: DraggableLocation;
  destination: DraggableLocation;
  draggableId: DraggableId;
}

interface INameToTaskMap {
  [key: string]: ITask;
}

interface INameToColumnMap {
  [key: string]: IColumn;
}

interface IAppState {
  tasks: INameToTaskMap;
  columns: INameToColumnMap;
  columnOrder: string[];
}

export const FETCH_CARDS_BEGIN = 'FETCH_CARDS_BEGIN';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';
export const MOVE_WITHIN_COLUMN = 'MOVE_WITHIN_COLUMN';

export const fetchCardsBegin = (): FetchCardsBeginAction => ({
  type: FETCH_CARDS_BEGIN
});

export const fetchCardsSuccess = (tasks: any, columns: any, columnOrder: string[]): FetchCardsSuccessAction => ({
  type: FETCH_CARDS_SUCCESS,
  payload: { tasks, columns, columnOrder }
});

export const fetchCardsFailure = (error: Error): FetchCardsFailureAction => ({
  type: FETCH_CARDS_FAILURE,
  error: error
});

export type CardsActionsTypes = FetchCardsBeginAction | FetchCardsSuccessAction | FetchCardsFailureAction | MoveWithinColumnAction;
