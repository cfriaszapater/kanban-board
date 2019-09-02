import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./createCardActions";
import expect from "expect";
import { Card } from "./types";
import { backendUrl } from "../../util/backendUrl";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async create card action", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should BEGIN, fetch and SUCCESS on create card", () => {
    const store = mockStore();
    const card: Card = { id: "card-13", content: "Do the laundry" };
    fetchMock.once(JSON.stringify(card));

    return store.dispatch(actions.createCard(card) as any).then(expectations());

    function expectations(): any {
      return () => {
        const expectedActions = [
          { type: actions.CREATE_CARD_BEGIN, payload: card },
          { type: actions.CREATE_CARD_SUCCESS, payload: card }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(backendUrl() + "/cards");
      };
    }
  });

  it("should BEGIN, fetch and FAILURE on create card that fails", () => {
    const error = new TypeError("Failed to fetch (simulated network error)");
    fetchMock.mockReject(error);
    const store = mockStore();
    const card: Card = { id: "card-13", content: "Do the laundry" };

    return store.dispatch(actions.createCard(card) as any).then(expectations());

    function expectations(): any {
      return () => {
        const expectedActions = [
          { type: actions.CREATE_CARD_BEGIN, payload: card },
          { type: actions.CREATE_CARD_FAILURE, payload: card }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(backendUrl() + "/cards");
      };
    }
  });
});
