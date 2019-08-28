import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./createCardAction";
import expect from "expect";
import { Task } from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async create card action", () => {
  // afterEach(() => {
  //   fetchMock.restore();
  // });

  // it("should test fetch-mock GET", async () => {
  //   fetchMock.mock("http://example.com", 200);
  //   const res = await fetch("http://example.com");
  //   expect(res.ok);
  //   fetchMock.restore();
  // });

  // it("should test fetch-mock POST", async () => {
  //   const error = new TypeError("Failed to fetch");
  //   fetchMock.postOnce("http://httpbin.org/post", {
  //     throws: error
  //   });
  //   try {
  //     const res = await fetch("http://httpbin.org/post", {
  //       method: "POST",
  //       body: JSON.stringify({ jarl: "chuj" })
  //     });
  //     expect(false).toEqual(true);
  //   } catch (e) {
  //     console.error(e);
  //     expect(e).toEqual(error);
  //   }
  //   fetchMock.restore();
  // });

  it("should dispatch BEGIN and SUCCESS on create card", () => {
    fetchMock.mock("http://httpbin.org/post", 200);

    const store = mockStore();
    const card: Task = { id: "task-13", content: "Do the laundry" };
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
    fetchMock.mock("http://httpbin.org/post", {
      throws: error
    });

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
