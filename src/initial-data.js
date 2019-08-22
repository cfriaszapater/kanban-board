/* jshint esversion: 8 */

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Create kanban board with react' },
    'task-2': { id: 'task-2', content: 'Deploy to heroku' },
    'task-3': { id: 'task-3', content: 'Start adding other features (eg: persist state in mongodb...)' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3']
    }
  },
  columnOrder: ['column-1']
};

export default initialData;
