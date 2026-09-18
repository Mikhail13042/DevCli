import './style.css';

let items = [
  { id: 1, name: 'Мяч футбольный', category: 'Мячи', quantity: 12, price: 1500 },
  { id: 2, name: 'Гантели 5 кг', category: 'Тренажёры', quantity: 6, price: 3200 },
];

const tableBody = document.getElementById('table-body');
const formEl = document.getElementById('add-form');

function render() {
  tableBody.innerHTML = '';

  items.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>${item.price} ₽</td>
      <td><button class="btn-delete" data-id="${item.id}">Удалить</button></td>
    `;
    tableBody.appendChild(row);
  });
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const newItem = {
    id: Date.now(),
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    quantity: Number(document.getElementById('quantity').value),
    price: Number(document.getElementById('price').value),
  };

  items.push(newItem);
  render();
  formEl.reset();
  document.getElementById('quantity').value = 1;
});

tableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-delete')) {
    const id = Number(event.target.dataset.id);
    items = items.filter((item) => item.id !== id);
    render();
  }
});

render();