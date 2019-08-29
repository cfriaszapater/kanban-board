import { cardsReducer, initialState } from "./reducers";
import {
  CreateCardActions,
  CreateCardBeginAction,
  CreateCardSuccessAction,
  CreateCardFailureAction,
  CREATE_CARD_BEGIN,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAILURE
} from "./createCardAction";
import {
  Cards,
  KanbanBoardState,
  Task,
  TaskLoading,
  TaskLoaded,
  TaskErrorLoading
} from "./types";
import { BEGIN_TASK_EDITING, FINISH_TASK_EDITING } from "./actions";

describe("create card reducer", () => {
  it("should return the initial state", () => {
    expect(cardsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should add task in loading status on CREATE_CARD_BEGIN from initial state", () => {
    const task: Task = { id: "task-1234", content: "An easy task" };
    const action: CreateCardBeginAction = {
      type: CREATE_CARD_BEGIN,
      payload: task
    };
    const resultState = cardsReducer(initialState, action);

    const newTaskLoading: TaskLoading = { ...task, loading: true };
    expect(resultState).toEqual(
      stateAfterOneCreate(initialState, newTaskLoading)
    );
  });

  it("should add task in loading status on CREATE_CARD_BEGIN from state with task added previously", () => {
    const previousTask: Task = { id: "task-1234", content: "An easy task" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousTask
    );
    const firstColId = Object.keys(previousState.columns)[0];
    console.log(
      "previousState.columns[firstColId].taskIds: ",
      previousState.columns[firstColId].taskIds
    );

    const task: Task = { id: "task-1235", content: "A difficult task" };
    const action: CreateCardBeginAction = {
      type: CREATE_CARD_BEGIN,
      payload: task
    };
    const resultState = cardsReducer(previousState, action);

    const newTaskLoading: TaskLoading = { ...task, loading: true };
    console.log(
      "previousState.columns[firstColId].taskIds: ",
      previousState.columns[firstColId].taskIds
    );
    const stateAfterTwoCreates: KanbanBoardState = {
      ...previousState,
      tasks: { ...previousState.tasks, [task.id]: newTaskLoading },
      columns: {
        ...previousState.columns,
        [firstColId]: {
          ...previousState.columns[firstColId],
          taskIds: [...previousState.columns[firstColId].taskIds, task.id]
        }
      }
    };
    console.log(
      "resultState.columns[firstColId].taskIds: ",
      resultState.columns[firstColId].taskIds
    );
    expect(resultState).toEqual(stateAfterTwoCreates);
  });

  it("should disable loading status of task on CREATE_CARD_SUCCESS", () => {
    const previousTask: TaskLoading = {
      id: "task-1234",
      content: "An easy task",
      loading: true
    };
    const taskLoadingState: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };

    const resultState = cardsReducer(taskLoadingState, {
      type: CREATE_CARD_SUCCESS,
      payload: previousTask
    });

    const taskLoaded: TaskLoaded = { ...previousTask, loading: false };
    const stateAfterSuccess: KanbanBoardState = {
      ...taskLoadingState,
      tasks: { ...taskLoadingState.tasks, [previousTask.id]: taskLoaded }
    };
    expect(resultState).toEqual(stateAfterSuccess);
  });

  it("should set task with error on CREATE_CARD_FAILURE", () => {
    const previousTask: TaskLoading = {
      id: "task-1234",
      content: "An easy task",
      loading: true
    };
    const taskLoadingState: KanbanBoardState = {
      ...initialState,
      tasks: { ...initialState.tasks, [previousTask.id]: previousTask }
    };

    const resultState = cardsReducer(taskLoadingState, {
      type: CREATE_CARD_FAILURE,
      payload: previousTask
    });

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

function stateAfterOneCreate(
  state: KanbanBoardState,
  task: Task
): KanbanBoardState {
  const firstCol = state.columns[Object.keys(state.columns)[0]];
  return {
    ...state,
    tasks: { ...state.tasks, [task.id]: task },
    columns: {
      ...state.columns,
      [firstCol.id]: {
        ...state.columns[firstCol.id],
        // Task added to tasks and columns[0].taskIds (was empty before)
        taskIds: [task.id]
      }
    }
  };
}

describe("task editing reducer", () => {
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

  it("should update task with new content and not editing on FINISH_TASK_EDITING", () => {
    const previousTask: Task = { id: "task-1234", content: "An easy task" };
    const previousState: KanbanBoardState = stateAfterOneCreate(
      initialState,
      previousTask
    );

    const newContent = "jarl!";
    const resultState: KanbanBoardState = cardsReducer(previousState, {
      type: FINISH_TASK_EDITING,
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
          editing: false
        }
      }
    });
  });
});
