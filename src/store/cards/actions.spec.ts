import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("task editing actions", () => {
  it("should dispatch action on start editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const action = store.dispatch(actions.beginTaskEditing(task));

    expect(action).toEqual({
      type: actions.BEGIN_TASK_EDITING,
      task: task,
      editing: true
    });
  });

  it("should dispatch action on change editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const newContent = "jarl";
    const action = store.dispatch(actions.changeTaskEditing(task, newContent));

    expect(action).toEqual({
      type: actions.CHANGE_TASK_EDITING,
      task: task,
      newContent: newContent
    });
  });

  it("should dispatch action on finish editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const newContent = "jarl";
    const action = store.dispatch(actions.finishTaskEditing(task, newContent));

    expect(action).toEqual({
      type: actions.FINISH_TASK_EDITING,
      task: task,
      newContent: newContent
    });
  });
});
