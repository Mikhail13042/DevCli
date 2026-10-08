import { useState } from 'react';

export default function ItemsTable({ items, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft(item);
  };

  const change = (field) => (e) => setDraft({ ...draft, [field]: e.target.value });

  const save = () => {
    onUpdate(editingId, {
      name: draft.name.trim(),
      category: draft.category.trim(),
      quantity: Number(draft.quantity),
      price: Number(draft.price),
    });
    setEditingId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Количество</th>
          <th>Цена</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) =>
          editingId === item.id ? (
            <tr key={item.id} className={index % 2 === 0 ? 'row-dark' : ''}>
              <td>{item.id}</td>
              <td><input value={draft.name} onChange={change('name')} /></td>
              <td><input value={draft.category} onChange={change('category')} /></td>
              <td><input type="number" min="0" value={draft.quantity} onChange={change('quantity')} /></td>
              <td><input type="number" min="0" value={draft.price} onChange={change('price')} /></td>
              <td className="actions">
                <button className="btn-save" onClick={save}>Сохранить</button>
                <button className="btn-secondary" onClick={() => setEditingId(null)}>Отмена</button>
              </td>
            </tr>
          ) : (
            <tr key={item.id} className={index % 2 === 0 ? 'row-dark' : ''}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.price} ₽</td>
              <td className="actions">
                <button className="btn-edit" onClick={() => startEdit(item)}>Изменить</button>
                <button className="btn-delete" onClick={() => onDelete(item.id)}>Удалить</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
