import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("enable task editing action", () => {
  it("should dispatch action on set editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const action = store.dispatch(actions.setTaskEditing(task, true));

    expect(action).toEqual({
      type: actions.SET_TASK_EDITING,
      task: task,
      editing: true
    });
  });
});
