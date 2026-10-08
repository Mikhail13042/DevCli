import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/inventory" replace />
          ) : (
            <LoginPage onLogin={setCurrentUser} />
          )
        }
      />
      <Route
        path="/inventory"
        element={
          currentUser ? (
            <InventoryPage user={currentUser} onLogout={() => setCurrentUser(null)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
