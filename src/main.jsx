import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminPanel from './pages/AdminPanel';
import Proposal from './pages/Proposal';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

// Debugging for Telegram Mini App
window.onerror = function(msg, url, line, col, error) {
  alert("Error: " + msg + "\nAt: " + url + ":" + line);
};

// Log start
console.log("App initializing...");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
