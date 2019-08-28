import { cardsReducer, initialState } from "./reducers";
import * as types from "./createCardAction";
import {
  Cards,
  KanbanBoardState,
  Task,
  TaskLoading,
  TaskLoaded
} from "./types";

describe("create card reducer", () => {
  it("should return the initial state", () => {
    expect(cardsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should add task in loading status on begin create card from initial state", () => {
    const task: Task = { id: "task-1234", content: "An easy task" };
    const action: types.CreateCardBeginAction = {
      type: types.CREATE_CARD_BEGIN,
      payload: task
    };

    const newTaskLoading: TaskLoading = { ...task, loading: true };
    const stateAfterOneCreate: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [task.id]: newTaskLoading }
    };
    expect(cardsReducer(initialState, action)).toEqual(stateAfterOneCreate);
  });

  it("should add task in loading status on begin create card from state with task added previously", () => {
    const previousTask: Task = { id: "task-1234", content: "An easy task" };
    const stateAfterOneCreate: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };
    const task: Task = { id: "task-1235", content: "A difficult task" };
    const action: types.CreateCardBeginAction = {
      type: types.CREATE_CARD_BEGIN,
      payload: task
    };

    const newTaskLoading: TaskLoading = { ...task, loading: true };
    const stateAfterTwoCreates: KanbanBoardState = {
      ...stateAfterOneCreate,
      tasks: { ...stateAfterOneCreate.tasks, [task.id]: newTaskLoading }
    };
    expect(cardsReducer(stateAfterOneCreate, action)).toEqual(
      stateAfterTwoCreates
    );
  });

  it("should disable loading status of task on create card success", () => {
    const previousTask: TaskLoading = {
      id: "task-1234",
      content: "An easy task",
      loading: true
    };
    const stateAfterBegin: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };

    const action: types.CreateCardSuccessAction = {
      type: types.CREATE_CARD_SUCCESS,
      payload: previousTask
    };
    const previousTaskLoaded: TaskLoaded = { ...previousTask, loading: false };
    const stateAfterSuccess: KanbanBoardState = {
      ...stateAfterBegin,
      tasks: { ...stateAfterBegin.tasks, [previousTask.id]: previousTaskLoaded }
    };
    expect(cardsReducer(stateAfterBegin, action)).toEqual(stateAfterSuccess);
  });
});
