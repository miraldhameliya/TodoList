import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync, editTodoAsync } from '../store/todoSlice';
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes, FaEye } from 'react-icons/fa';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ViewTodoModal from './ViewTodoModal';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodoAsync({ 
      id: todo.id, 
      completed: !todo.completed 
    }));
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTodoAsync(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim() !== '') {
      dispatch(editTodoAsync({
        id: todo.id,
        todo: editedText.trim()
      }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(todo.todo);
    setIsEditing(false);
  };

  const handleView = () => {
    setIsViewModalOpen(true);
  };

  return (
    <>
      <li className="group bg-white border border-gray-100 rounded-lg mb-3 hover:shadow-md transition-all">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={handleToggle}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${todo.completed 
                  ? 'border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600' 
                  : 'border-gray-300 hover:border-green-500'
                }`}
            >
              {todo.completed && <FaCheck className="text-xs" />}
            </button>
            
            {isEditing ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (editedText.trim() !== '') {
                      dispatch(editTodoAsync({
                        id: todo.id,
                        todo: editedText.trim()
                      }));
                      setIsEditing(false);                                                                                                        
                    }
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
                className="flex-1 p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <span
                className={`text-gray-800 transition-all ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.todo} 
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-600 transition-all"
                  title="Save"
                >
                  <FaSave />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-500 transition-all"
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleView}
                  className="text-blue-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="View Details"
                >
                  <FaEye />
                </button>
                <button
                  onClick={handleEdit}
                  className="text-blue-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        </div>
      </li>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <ViewTodoModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        todo={todo}
      />
    </>
  );
}

export default TodoItem; 