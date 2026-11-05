import { Provider, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store.js';
import Login from './employees/login/Login.jsx';
import Employees from './employees/Employees.jsx';

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/inventory" replace /> : <Login />}
      />
      <Route
        path="/inventory"
        element={user ? <Employees /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}