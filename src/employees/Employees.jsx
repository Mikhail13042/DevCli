import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddItemForm from '../components/AddItemForm.jsx';
import ItemsTable from '../components/ItemsTable.jsx';
import ItemsCards from '../components/ItemsCards.jsx';
import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from '../store/action/employeeAction.js';
import { logoutUser } from '../store/action/authActions.js';

export default function Employees() {
  const [view, setView] = useState('table');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { list: items, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAdd = (data) => dispatch(addEmployee(data));
  const handleDelete = (id) => dispatch(deleteEmployee(id));
  const handleUpdate = (id, data) => dispatch(updateEmployee({ id, data }));

  const logout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="main-page">
      <header>
        <h1>Спортивный инвентарь</h1>
        <div className="user-info">
          <span>Вы вошли как: <strong>{user.name}</strong></span>
          <button className="btn-secondary" onClick={logout}>Выйти</button>
        </div>
      </header>

      <AddItemForm onAdd={handleAdd} />

      <hr />

      <div className="view-switch">
        <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>
          Таблица
        </button>
        <button className={view === 'cards' ? 'active' : ''} onClick={() => setView('cards')}>
          Карточки
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p>Список пуст</p>
      ) : view === 'table' ? (
        <ItemsTable items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
      ) : (
        <ItemsCards items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
      )}
    </div>
  );
}