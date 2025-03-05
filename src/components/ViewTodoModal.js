import React from 'react';
import { FaTimes, FaUser, FaCheckCircle, FaClock } from 'react-icons/fa';

function ViewTodoModal({ isOpen, onClose, todo }) {
  if (!isOpen || !todo) return null;

  return (
    <>
   
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
        onClick={onClose}
      ></div>

  
      <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
        <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
   
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium text-gray-800">
              Task Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

         
          <div className="px-4 py-3 space-y-4">
       
            <div className="flex items-start gap-8">
              <p className="text-sm text-gray-500 w-20">Task</p>
              <p className="text-gray-800">{todo.todo}</p>
            </div>

         
            <div className="flex items-center gap-8">
              <p className="text-sm text-gray-500 w-20">Status</p>
              {todo.completed ? (
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-500 text-sm" />
                  <span className="text-green-500">Completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaClock className="text-yellow-500 text-sm" />
                  <span className="text-yellow-500">Pending</span>
                </div>
              )}
            </div>

       
            <div className="flex items-center gap-8">
              <p className="text-sm text-gray-500 w-20">Assigned To</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-500 text-xs" />
                </div>
                <span className="text-gray-700">User {todo.userId}</span>
              </div>
            </div>

      
            <div className="flex items-center gap-8">
              <p className="text-sm text-gray-500 w-20">Task ID</p>
              <p className="text-gray-600">#{todo.id}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTodoModal; 