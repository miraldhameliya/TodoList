import React, { useState } from 'react';
import TodoList from './TodoList';
import Filter from './Filter';
import Sidebar from './Sidebar';
import AddTaskModal from './AddTaskModal';
import { FaPlus, FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTodos } from '../hooks/useTodos';
import { ITEMS_PER_PAGE, MODAL_TYPES, PROGRESS_COLORS } from '../constants';
import { getProgressStyle } from '../utils/helpers';

function TodoApp() {
  const {
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
  } = useTodos();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: MODAL_TYPES.TASK
  });

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (type) => {
    setModalConfig({
      isOpen: true,
      type
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: MODAL_TYPES.TASK
    });
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex justify-start items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className='mb-4 md:mb-0'>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, Savan 👋</h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your tasks today.</p>
              </div>
              <button
                onClick={() => openModal(MODAL_TYPES.TASK)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 mt-2 md:mt-0"
              >
                <FaPlus className="text-sm" />
                Add New Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16">
                    <div
                      className="w-full h-full rounded-full"
                      style={getProgressStyle(84, PROGRESS_COLORS.TOTAL)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-blue-600">84%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16">
                    <div
                      className="w-full h-full rounded-full"
                      style={getProgressStyle(completedPercentage, PROGRESS_COLORS.COMPLETED)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-green-600">{completedPercentage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16">
                    <div
                      className="w-full h-full rounded-full"
                      style={getProgressStyle(pendingPercentage, PROGRESS_COLORS.PENDING)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-yellow-600">{pendingPercentage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Filter currentFilter={filter} onFilterChange={setFilter} />
              <TodoList todos={paginatedTodos} />

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredTodos.length)} of {filteredTodos.length} tasks
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <FaChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-8 h-8 rounded-lg ${
                          currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
      />
    </div>
  );
}

export default TodoApp; 
