import React from 'react';
import { useSelector } from 'react-redux';

function Filter({ currentFilter, onFilterChange }) {
  const { items: todos } = useSelector(state => state.todos);


  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 rounded-full transition-all ${
          currentFilter === 'all'
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('all')}
      >
        All Tasks
      </button>
      <button
        className={`px-4 py-2 rounded-full transition-all ${
          currentFilter === 'completed'
            ? 'bg-green-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`px-4 py-2 rounded-full transition-all ${
          currentFilter === 'pending'
            ? 'bg-yellow-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </button>
    </div>
  );
}

export default Filter; 