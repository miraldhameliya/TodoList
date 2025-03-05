import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoService } from '../services/todoService';
import { localStorageService } from '../services/localStorageService';
import { toast } from 'react-toastify';


const ensureArray = (data) => Array.isArray(data) ? data : [];


const initialTodos = localStorageService.getTodos();

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
   
      const localTodos = localStorageService.getTodos();
      
      try {
       
        const apiTodos = await todoService.getAllTodos();
        const todos = ensureArray(apiTodos);
      
        const mergedTodos = [...localTodos];
        todos.forEach(apiTodo => {
          const exists = localTodos.some(localTodo => localTodo.id === apiTodo.id);
          if (!exists) {
            mergedTodos.push(apiTodo);
          }
        });
        

        localStorageService.setTodos(mergedTodos);
        return mergedTodos;
      } catch (apiError) {
        console.error('API Error:', apiError);
  
        return localTodos;
      }
    } catch (error) {
      toast.error('Failed to fetch todos');
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (title, { rejectWithValue, getState }) => {
    try {
      
      const tempId = Date.now() + Math.floor(Math.random() * 1000);
      
 
      const newTodo = {
        id: tempId,
        todo: title,
        completed: false,
        userId: 1
      };

      try {
      
        const apiNewTodo = await todoService.addTodo(title);
      
        localStorageService.addTodo(apiNewTodo);
        toast.success('Todo added successfully');
        return apiNewTodo;
      } catch (apiError) {
        console.warn('API add failed, falling back to local storage:', apiError.message);
  
        localStorageService.addTodo(newTodo);
        toast.success('Todo added to local storage');
        return newTodo;
      }
    } catch (error) {
      toast.error('Failed to add todo');
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodo',
  async ({ id, completed }, { rejectWithValue, getState }) => {
    try {
      const currentTodo = getState().todos.items.find(todo => todo.id === id);
      if (!currentTodo) {
        throw new Error('Todo not found in state');
      }

      const updatedTodo = {
        ...currentTodo,
        completed: completed
      };


      localStorageService.updateTodo(updatedTodo);
      toast.success(`Task marked as ${completed ? 'completed' : 'pending'}`);
      return updatedTodo;
    } catch (error) {
      toast.error('Failed to update task status');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      try {
      
        await todoService.deleteTodo(id);
        toast.success('Delete Task Successfully');
      } catch (apiError) {
        console.warn('API delete failed, proceeding with local delete:', apiError.message);
      }
      

      localStorageService.deleteTodo(id);
   
      return id;
    } catch (error) {
      toast.error('Failed to delete todo');
      return rejectWithValue(error.message);
    }
  }
);

export const editTodoAsync = createAsyncThunk(
  'todos/editTodo',
  async ({ id, todo }, { rejectWithValue, getState }) => {
    try {
      const currentTodo = getState().todos.items.find(t => t.id === id);
      if (!currentTodo) {
        throw new Error('Todo not found in state');
      }


      const updatedTodo = {
        ...currentTodo,
        todo: todo,
        completed: currentTodo.completed 
      };

      try {
     
        const response = await todoService.updateTodo(id, { todo });
        
     
        const finalTodo = {
          ...response,
          completed: currentTodo.completed 
        };
        
      
        localStorageService.updateTodo(finalTodo);
        toast.success('Task updated successfully');
        return finalTodo;
      } catch (apiError) {
        console.warn('API update failed, falling back to local storage:', apiError.message);
       
        localStorageService.updateTodo(updatedTodo);
        return updatedTodo;
      }
    } catch (error) {
      toast.error('Failed to update task');
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: initialTodos,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = ensureArray(action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
       
        state.items = ensureArray(initialTodos);
      })

      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items = ensureArray(state.items);
        state.items.push(action.payload);
      })
  
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        state.items = ensureArray(state.items);
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
    
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = ensureArray(state.items);
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        state.items = ensureArray(state.items);
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer; 