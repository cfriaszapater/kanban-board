import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./createCardAction";
import expect from "expect";
import { Task } from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async create card action", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should dispatch BEGIN and SUCCESS on create card", () => {
    const store = mockStore();
    const card: Task = { id: "task-13", content: "Do the laundry" };
    fetchMock.once(JSON.stringify({ json: card }));
    const expectedActions = [
      { type: actions.CREATE_CARD_BEGIN, payload: card },
      { type: actions.CREATE_CARD_SUCCESS, payload: card }
    ];

    return store.dispatch(actions.createCard(card) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch BEGIN and FAILURE on create card that fails", () => {
    const error = new TypeError("Failed to fetch");
    fetchMock.mockReject(error);
    const store = mockStore();
    const card: Task = { id: "task-13", content: "Do the laundry" };
    const expectedActions = [
      { type: actions.CREATE_CARD_BEGIN, payload: card },
      { type: actions.CREATE_CARD_FAILURE, payload: card }
    ];

    return store.dispatch(actions.createCard(card) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
