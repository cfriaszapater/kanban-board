import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as beginTaskEditing from "./updateCardActions";
import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("task editing actions", () => {
  it("should dispatch action on start editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const action = store.dispatch(beginTaskEditing.beginTaskEditing(task));

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
    const action = store.dispatch(
      beginTaskEditing.changeTaskEditing(task, newContent)
    );

    expect(action).toEqual({
      type: actions.CHANGE_TASK_EDITING,
      task: task,
      newContent: newContent
    });
  });

  it("should dispatch action on commit editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const newContent = "jarl";
    const action = store.dispatch(
      beginTaskEditing.finishTaskEditing(task, newContent)
    );

    expect(action).toEqual({
      type: actions.BEGIN_COMMIT_TASK_EDITING,
      task: task,
      newContent: newContent
    });
  });
});
