export const ITEMS_PER_PAGE = 10;
export const STORAGE_KEY = 'todos';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://dummyjson.com/todos';

export const FILTER_TYPES = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending'
};

export const MODAL_TYPES = {
  TASK: 'task',
  PRIORITY: 'priority'
};

export const TOAST_POSITION = 'top-right';
export const TOAST_DURATION = 3000;

export const PROGRESS_COLORS = {
  TOTAL: '#3b82f6',
  COMPLETED: '#22c55e',
  PENDING: '#eab308'
}; 