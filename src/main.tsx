import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LoginProvider } from './context/LoginProvider';
import './index.css';


ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <LoginProvider>
        <App />
      </LoginProvider>
    </React.StrictMode>,
  );
