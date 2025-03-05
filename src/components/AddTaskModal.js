import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../store/todoSlice';
import { FaTimes } from 'react-icons/fa';

function AddTaskModal({ isOpen, onClose, type = 'task' }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodoAsync(title.trim()));
      setTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-60"></div>
      <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
        <div className="bg-white rounded-lg w-full max-w-md">

          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Add {type === 'priority' ? 'Task Priority' : 'Task Status'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'priority' ? 'Task Priority Title' : 'Task Status Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder={`Enter ${type} title`}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal; 