import React from 'react';
import TodoItem from './TodoItem';
import { FaClipboardList } from 'react-icons/fa';

function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <FaClipboardList className="text-4xl mb-4" />
        <p className="text-lg">No tasks found</p>
        <p className="text-sm">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <>
         <TodoItem key={todo.id} todo={todo} />
       
        </>
       
      ))}
    </ul>
  );
}

export default TodoList; 