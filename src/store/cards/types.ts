export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ITask {
  id: string;
  content: string;
}

export interface NameToTaskMap {
  [key: string]: ITask;
}

export interface NameToColumnMap {
  [key: string]: IColumn;
}

export interface KanbanBoardState {
  tasks: NameToTaskMap;
  columns: NameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error | null;
}

