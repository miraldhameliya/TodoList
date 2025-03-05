import React from 'react';
import './App.css';
import TodoApp from './components/TodoApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary';
import { TOAST_POSITION, TOAST_DURATION } from './constants';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          <TodoApp />
          <ToastContainer
            position={TOAST_POSITION}
            autoClose={TOAST_DURATION}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
