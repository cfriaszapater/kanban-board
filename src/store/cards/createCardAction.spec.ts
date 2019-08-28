import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './createCardAction'
import expect from 'expect'
import { Task } from './types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async create card action', () => {
  afterEach(() => {
  })

  it('should dispatch begin and success actions on create card', () => {
    const store = mockStore();
    const card: Task = { id: 'task-13', content: 'Do the laundry' };
    const expectedActions = [
      { type: actions.CREATE_CARD_BEGIN, payload: card },
      { type: actions.CREATE_CARD_SUCCESS, payload: card }
    ]

    return store.dispatch(actions.createCard(card) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
