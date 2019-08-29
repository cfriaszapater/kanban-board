import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  beginTaskEditing,
  changeTaskEditing,
  updateCardBegin,
  updateCard,
  UPDATE_CARD_SUCCESS,
  UpdateCardBeginAction,
  UpdateCardActions
} from "./updateCardActions";
import expect from "expect";
import { Task } from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("task editing actions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should dispatch action on start editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const action = store.dispatch(beginTaskEditing(task));

    expect(action).toEqual({
      type: BEGIN_TASK_EDITING,
      task: task,
      editing: true
    });
  });

  it("should dispatch action on change editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi" };

    const newContent = "jarl";
    const action = store.dispatch(changeTaskEditing(task, newContent));

    expect(action).toEqual({
      type: CHANGE_TASK_EDITING,
      task: task,
      newContent: newContent
    });
  });

  it("should dispatch UPDATE_CARD_BEGIN for task with new content and not editing", () => {
    const store = mockStore();
    const task = { id: "13", content: "hi", editing: true };

    const newContent = "jarl";
    const action = store.dispatch(updateCardBegin(task, newContent));

    const taskWithNewContentNotEditing: Task = {
      ...task,
      content: newContent,
      editing: false
    };
    const expectedAction: UpdateCardBeginAction = {
      type: UPDATE_CARD_BEGIN,
      task: taskWithNewContentNotEditing
    };
    expect(action).toEqual(expectedAction);
  });

  it("should BEGIN, fetch and SUCCESS on update card", () => {
    const store = mockStore();
    const card: Task = { id: "task-13", content: "Do the laundry" };
    fetchMock.once(JSON.stringify({ json: card }));

    const newContent = "new content";
    const taskWithNewContentNotEditing: Task = {
      ...card,
      content: newContent,
      editing: false
    };
    return store
      .dispatch(updateCard(card, newContent) as any)
      .then(expectations());

    function expectations(): any {
      return () => {
        const expectedActions: UpdateCardActions[] = [
          { type: UPDATE_CARD_BEGIN, task: taskWithNewContentNotEditing },
          { type: UPDATE_CARD_SUCCESS, task: taskWithNewContentNotEditing }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(
          "http://httpbin.org/put/" + card.id
        );
      };
    }
  });
});
