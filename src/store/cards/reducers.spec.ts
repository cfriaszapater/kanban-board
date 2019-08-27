import { cardsReducer, initialState } from './reducers'
import * as types from './createCardAction'
import { Cards, KanbanBoardState } from './types';

describe('create card reducer', () => {
  it('should return the initial state', () => {
    expect(cardsReducer(undefined, {} as any)).toEqual(initialState);
  })

  it('should add task on begin create card from initial state', () => {
    const task = { id: 'task-1234', content: 'An easy task' };
    const action: types.CreateCardBeginAction = {
      type: types.CREATE_CARD_BEGIN,
      payload: task
    };

    const stateAfterOneCreate: KanbanBoardState = { ...initialState, tasks: { ...initialState.tasks, [task.id]: task }};
    expect(
      cardsReducer(initialState, action)
    ).toEqual(
      stateAfterOneCreate
    );
  })

  it('should add task on begin create card from state with task added previously', () => {
    const previousTask = { id: 'task-1234', content: 'An easy task' };
    const stateAfterOneCreate: KanbanBoardState = { ...initialState, tasks: { ...initialState.tasks, [previousTask.id]: previousTask }};
    const task = { id: 'task-1235', content: 'A difficult task' };
    const action: types.CreateCardBeginAction = {
      type: types.CREATE_CARD_BEGIN,
      payload: task
    };

    const stateAfterTwoCreates: KanbanBoardState = { ...stateAfterOneCreate, tasks: { ...stateAfterOneCreate.tasks, [task.id]: task }};
    expect(
      cardsReducer(stateAfterOneCreate, action)
    ).toEqual(
      stateAfterTwoCreates
    );
  })
})
