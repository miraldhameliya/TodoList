
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://dummyjson.com/todos';
console.log(BASE_URL);


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API did not return JSON");
  }

  return response.json();
};

export const todoService = {
  
  getAllTodos: async (limit = 10, skip = 0) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await handleResponse(response);

      return Array.isArray(data.todos) ? data.todos.map(todo => ({
        id: todo.id,
        todo: todo.todo || '',
        completed: todo.completed || false,
        userId: todo.userId
      })) : [];
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      throw error;
    }
  },


  getTodoById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },

  getRandomTodo: async () => {
    try {
      const response = await fetch(`${BASE_URL}/random`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching random todo:', error);
      throw error;
    }
  },

  getTodosByUserId: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user todos:', error);
      throw error;
    }
  },


  addTodo: async (todoData) => {
    try {
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          todo: todoData,
          completed: false,
          userId: 1
        })
      });
      const data = await handleResponse(response);
   
      return {
        id: data.id,
        todo: data.todo || todoData,
        completed: data.completed || false,
        userId: data.userId || 1
      };
    } catch (error) {
      console.error('Error adding todo:', error.message);
      throw error;
    }
  },


  updateTodo: async (id, updateData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

   
      if (response.status === 404) {
        throw new Error(`Todo with id '${id}' not found in API`);
      }

      const data = await handleResponse(response);
      
      return {
        id: data.id,
        todo: data.todo || '',
        completed: data.completed || false,
        userId: data.userId
      };
    } catch (error) {
      console.error('Error updating todo:', error.message);
      throw error;
    }
  },

 
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}; 