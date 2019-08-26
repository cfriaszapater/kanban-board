export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ITask {
  id: string;
  content: string;
}

interface INameToTaskMap {
  [key: string]: ITask;
}

interface INameToColumnMap {
  [key: string]: IColumn;
}

export interface KanbanBoardState {
  tasks: INameToTaskMap;
  columns: INameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error | null;
}

