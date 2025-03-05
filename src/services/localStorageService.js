const STORAGE_KEY = 'todos';


const generateIncrementingId = () => {
  try {
    const todos = localStorageService.getTodos();
 
    const maxId = todos.reduce((max, todo) => {
    
      const currentId = Number(todo.id);
      return currentId > max ? currentId : max;
    }, 30); 

    return maxId + 1;
  } catch (error) {
    console.error('Error generating incrementing ID:', error);
    return 31; 
  }
};

const ensureTodoStructure = (todo) => ({
  id: Number(todo.id), 
  todo: todo.todo || '',
  completed: todo.completed || false,
  userId: todo.userId || 1
});

export const localStorageService = {
  getTodos: () => {
    try {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
  
      return Array.isArray(todos) ? todos.map(ensureTodoStructure) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  setTodos: (todos) => {
    try {
      const structuredTodos = Array.isArray(todos) ? todos.map(ensureTodoStructure) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(structuredTodos));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  addTodo: (todo) => {
    try {
      const todos = localStorageService.getTodos();
  
      const newTodo = {
        ...todo,
        id: generateIncrementingId()
      };
      todos.push(newTodo);
      localStorageService.setTodos(todos);
      return newTodo;
    } catch (error) {
      console.error('Error adding todo to localStorage:', error);
      return null;
    }
  },

  updateTodo: (updatedTodo) => {
    try {
      const todos = localStorageService.getTodos();
      const index = todos.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        todos[index] = updatedTodo;
        localStorageService.setTodos(todos);
        return updatedTodo;
      }
      return null;
    } catch (error) {
      console.error('Error updating todo in localStorage:', error);
      return null;
    }
  },

  deleteTodo: (id) => {
    try {
      const todos = localStorageService.getTodos();
      const filteredTodos = todos.filter(todo => todo.id !== Number(id));
      localStorageService.setTodos(filteredTodos);
    } catch (error) {
      console.error('Error deleting todo from localStorage:', error);
    }
  }
}; 