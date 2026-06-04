import React from 'react';
import AppRoutes from './routes/AppRoutes';
// Optional: Notifications ke liye (agar aapne install kiya hai: npm install react-toastify)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* ToastContainer har page par messages show karne mein madad karega */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Saare Routes yahan se handle honge */}
      <AppRoutes />
    </div>
  );
}

export default App;