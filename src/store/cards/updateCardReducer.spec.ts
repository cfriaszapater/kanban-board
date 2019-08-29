import { cardsReducer, initialState } from "./reducers";
import { KanbanBoardState, Task } from "./types";
import {
  BEGIN_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  CHANGE_TASK_EDITING
} from "./updateCardActions";
import { stateAfterOneCreate } from "./createCardReducer.spec";

describe("card update (editing) reducer", () => {
  it("should start editing in task on START_TASK_EDITING", () => {
    const previousTask: Task = { id: "task-1234", content: "An easy task" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousTask
    );

    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: BEGIN_TASK_EDITING,
      task: previousTask,
      editing: true
    });

    expect(resultState).toEqual({
      ...previousState,
      tasks: {
        ...previousState.tasks,
        [previousTask.id]: { ...previousTask, editing: true }
      }
    });
  });

  it("should update task with new content on CHANGE_TASK_EDITING", () => {
    const previousTask: Task = {
      id: "task-1234",
      content: "An easy task",
      editing: true
    };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousTask
    );

    const newContent = "condemor!";
    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: CHANGE_TASK_EDITING,
      task: previousTask,
      newContent: newContent
    });

    expect(resultState).toEqual({
      ...previousState,
      tasks: {
        ...previousState.tasks,
        [previousTask.id]: {
          ...previousTask,
          content: newContent,
          editing: true
        }
      }
    });
  });

  it("should update task on UPDATE_CARD_BEGIN", () => {
    const previousTask: Task = { id: "task-1234", content: "An easy task" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousTask
    );

    const newContent = "jarl!";
    const taskWithUpdatedContent: Task = {
      ...previousTask,
      content: newContent,
      editing: false
    };
    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: UPDATE_CARD_BEGIN,
      task: taskWithUpdatedContent
    });

    expect(resultState).toEqual({
      ...previousState,
      tasks: {
        ...previousState.tasks,
        [previousTask.id]: {
          ...previousTask,
          content: newContent,
          editing: false
        }
      }
    });
  });
});
