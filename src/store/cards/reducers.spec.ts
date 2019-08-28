import { cardsReducer, initialState } from "./reducers";
import * as types from "./createCardAction";
import {
  Cards,
  KanbanBoardState,
  Task,
  TaskLoading,
  TaskLoaded,
  TaskErrorLoading
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
    const taskLoadingState: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };

    const action: types.CreateCardSuccessAction = {
      type: types.CREATE_CARD_SUCCESS,
      payload: previousTask
    };
    const resultState = cardsReducer(taskLoadingState, action);

    const taskLoaded: TaskLoaded = { ...previousTask, loading: false };
    const stateAfterSuccess: KanbanBoardState = {
      ...taskLoadingState,
      tasks: { ...taskLoadingState.tasks, [previousTask.id]: taskLoaded }
    };
    expect(resultState).toEqual(stateAfterSuccess);
  });

  it("should set task with error on create card failure", () => {
    const previousTask: TaskLoading = {
      id: "task-1234",
      content: "An easy task",
      loading: true
    };
    const taskLoadingState: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };

    const action: types.CreateCardFailureAction = {
      type: types.CREATE_CARD_FAILURE,
      payload: previousTask
    };
    const resultState = cardsReducer(taskLoadingState, action);

    const taskWithError: TaskErrorLoading = {
      ...previousTask,
      loading: false,
      error: true
    };
    const stateAfterErrorLoadingTask: KanbanBoardState = {
      ...taskLoadingState,
      tasks: { ...taskLoadingState.tasks, [previousTask.id]: taskWithError }
    };
    expect(resultState).toEqual(stateAfterErrorLoadingTask);
  });
});
