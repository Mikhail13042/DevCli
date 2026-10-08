import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddItemForm from '../components/AddItemForm.jsx';
import ItemsTable from '../components/ItemsTable.jsx';
import ItemsCards from '../components/ItemsCards.jsx';
import InventoryAPI from '../services/inventoryService.js';

export default function InventoryPage({ user, onLogout }) {
  const [items, setItems] = useState(() => InventoryAPI.all());
  const [view, setView] = useState('table'); 
  const navigate = useNavigate();

  const handleAdd = (data) => {
    InventoryAPI.add(data);
    setItems(InventoryAPI.all());
  };

  const handleDelete = (id) => {
    InventoryAPI.delete(id);
    setItems(InventoryAPI.all());
  };

  const handleUpdate = (id, data) => {
    InventoryAPI.update({ id, ...data });
    setItems(InventoryAPI.all());
  };

  const logout = () => {
    onLogout();
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
