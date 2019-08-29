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

    return store
      .dispatch(actions.createCard(card) as any)
      .then(expectations(store, expectedActions));

    function expectations(
      store: any,
      expectedActions: { type: string; payload: Task }[]
    ): any {
      return () => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(
          "http://httpbin.org/post"
        );
      };
    }
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

    return store
      .dispatch(actions.createCard(card) as any)
      .then(expectations(store, expectedActions));

    function expectations(
      store: any,
      expectedActions: { type: string; payload: Task }[]
    ): any {
      return () => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(
          "http://httpbin.org/post"
        );
      };
    }
  });
});
