const InventoryAPI = {
  items: [
    { id: 1, name: 'Мяч футбольный', category: 'Мячи', quantity: 12, price: 50 },
    { id: 2, name: 'Гантели 5 кг', category: 'Тренажёры', quantity: 6, price: 30 },
    { id: 3, name: 'Скакалка', category: 'Аксессуары', quantity: 20, price: 15 },
    { id: 4, name: 'Баскетбольный мяч', category: 'Мячи', quantity: 8, price: 60 },
    { id: 5, name: 'Коврик для йоги', category: 'Аксессуары', quantity: 15, price: 30 },
  ],
  all() {
    return this.items;
  },
  get(id) {
    return this.items.find((i) => i.id === id);
  },
  add(item) {
    const id = this.items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
    const created = { ...item, id };
    this.items = [...this.items, created];
    return created;
  },
  update(item) {
    this.items = this.items.map((i) => (i.id === item.id ? { ...i, ...item } : i));
    return this.get(item.id);
  },
  delete(id) {
    this.items = this.items.filter((i) => i.id !== id);
    return true;
  },
};

export default InventoryAPI;
