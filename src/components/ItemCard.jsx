import { useState } from 'react';

export default function ItemCard({ item, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item);

  const change = (field) => (e) => setDraft({ ...draft, [field]: e.target.value });

  const startEdit = () => {
    setDraft(item);
    setEditing(true);
  };

  const save = () => {
    onUpdate(item.id, {
      name: draft.name.trim(),
      category: draft.category.trim(),
      quantity: Number(draft.quantity),
      price: Number(draft.price),
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="card">
        <input value={draft.name} onChange={change('name')} placeholder="Название" />
        <input value={draft.category} onChange={change('category')} placeholder="Категория" />
        <input type="number" min="0" value={draft.quantity} onChange={change('quantity')} />
        <input type="number" min="0" value={draft.price} onChange={change('price')} />
        <div className="actions">
          <button className="btn-save" onClick={save}>Сохранить</button>
          <button className="btn-secondary" onClick={() => setEditing(false)}>Отмена</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p><strong>Категория:</strong> {item.category}</p>
      <p><strong>Количество:</strong> {item.quantity}</p>
      <p><strong>Цена:</strong> {item.price} ₽</p>
      <div className="actions">
        <button className="btn-edit" onClick={startEdit}>Изменить</button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>Удалить</button>
      </div>
    </div>
  );
}
