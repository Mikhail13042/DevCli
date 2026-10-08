import { useState } from 'react';

const empty = { name: '', category: '', quantity: 1, price: '' };

export default function AddItemForm({ onAdd }) {
  const [form, setForm] = useState(empty);

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name: form.name.trim(),
      category: form.category.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
    setForm(empty);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <button type="submit" className="btn-add">Добавить</button>
      <div className="field">
        <label>Название</label>
        <input type="text" value={form.name} onChange={change('name')} required />
      </div>
      <div className="field">
        <label>Категория</label>
        <input type="text" value={form.category} onChange={change('category')} required />
      </div>
      <div className="field">
        <label>Количество</label>
        <input type="number" min="0" value={form.quantity} onChange={change('quantity')} required />
      </div>
      <div className="field">
        <label>Цена</label>
        <input type="number" min="0" value={form.price} onChange={change('price')} required />
      </div>
    </form>
  );
}
