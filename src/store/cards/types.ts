export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  content: string;
}

export interface TaskLoading extends Task {
  loading: true;
}

export interface TaskLoaded extends Task {
  loading: false;
}

export interface NameToTaskMap {
  [key: string]: Task;
}

export interface NameToColumnMap {
  [key: string]: Column;
}

export interface Cards {
  tasks: NameToTaskMap;
  columns: NameToColumnMap;
  columnOrder: string[];
}

export interface KanbanBoardState extends Cards {
  loading: boolean;
  error: Error | null;
}
