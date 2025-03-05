import React from 'react';
import { FaTachometerAlt, FaUserCircle, FaTimes } from 'react-icons/fa';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
    
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
  
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
     
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <FaTimes />
        </button>

   
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <FaUserCircle className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Savan Gurung</h2>
              <p className="text-sm text-gray-500">Savan@gmail.com</p>
            </div>
          </div>
        </div>

      
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-blue-500 bg-blue-50 rounded-lg">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar; 