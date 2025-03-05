import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todoSlice';
import { FILTER_TYPES } from '../constants';

export const useTodos = () => {
  const dispatch = useDispatch();
  const { items: todos, status, error } = useSelector(state => state.todos);
  const [filter, setFilter] = useState(FILTER_TYPES.ALL);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const safeTodos = Array.isArray(todos) ? todos : [];
  const totalTasks = safeTodos.length;
  const completedCount = safeTodos.filter(todo => todo.completed).length;
  const pendingCount = safeTodos.filter(todo => !todo.completed).length;

  const completedPercentage = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
  const pendingPercentage = totalTasks ? Math.round((pendingCount / totalTasks) * 100) : 0;

  const sortedTodos = [...safeTodos].sort((a, b) => b.id - a.id);

  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === FILTER_TYPES.COMPLETED) return todo.completed;
    if (filter === FILTER_TYPES.PENDING) return !todo.completed;
    return true;
  });

  return {
    todos: safeTodos,
    status,
    error,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    totalTasks,
    completedCount,
    pendingCount,
    completedPercentage,
    pendingPercentage,
    filteredTodos
  };
}; 