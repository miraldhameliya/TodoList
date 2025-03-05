export const ensureArray = (data) => Array.isArray(data) ? data : [];

export const getProgressStyle = (percentage, color) => ({
  background: `conic-gradient(${color} ${percentage * 3.6}deg, #f3f4f6 ${percentage * 3.6}deg)`
});

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const validateTodo = (todo) => {
  if (!todo || typeof todo !== 'object') return false;
  if (!todo.id || typeof todo.id !== 'number') return false;
  if (!todo.todo || typeof todo.todo !== 'string') return false;
  if (typeof todo.completed !== 'boolean') return false;
  return true;
}; 