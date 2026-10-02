import './style.css';

const accounts = [
  { login: 'admin', password: '123', name: 'Администратор' },
  { login: 'user',  password: '456', name: 'Пользователь' },
];

let currentUser = null;

let items = [
  { id: 1, name: 'Мяч футбольный', category: 'Мячи', quantity: 12, price: 1500 },
  { id: 2, name: 'Гантели 5 кг', category: 'Тренажёры', quantity: 6, price: 3200 },
  { id: 3, name: 'Скакалка', category: 'Аксессуары', quantity: 20, price: 450 },
];

const loginPage     = document.getElementById('login-page');
const mainPage      = document.getElementById('main-page');
const loginForm     = document.getElementById('login-form');
const loginError    = document.getElementById('login-error');
const currentUserEl = document.getElementById('current-user');
const logoutBtn     = document.getElementById('logout-btn');

const formEl         = document.getElementById('add-form');
const tableBody      = document.getElementById('table-body');
const cardsContainer = document.getElementById('cards-container');
const tableView      = document.getElementById('table-view');
const cardsView      = document.getElementById('cards-view');
const btnTable       = document.getElementById('btn-table');
const btnCards       = document.getElementById('btn-cards');

function router() {
  const hash = window.location.hash || '#/login';

  if (hash === '#/inventory') {
    if (!currentUser) {
      window.location.hash = '#/login';
      return;
    }
    showMainPage();
  } else {
    showLoginPage();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value;

  const user = accounts.find(acc => acc.login === login && acc.password === password);

  if (user) {
    currentUser = user;
    loginError.textContent = '';
    window.location.hash = '#/inventory';
  } else {
    loginError.textContent = 'Неверный логин или пароль';
  }
});

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  window.location.hash = '#/login';
});

function showMainPage() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  currentUserEl.textContent = currentUser.name;
  render();
}

function showLoginPage() {
  mainPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
  loginForm.reset();
  loginError.textContent = '';
}

function render() {
  renderTable();
  renderCards();
}

function renderTable() {
  tableBody.innerHTML = '';

  items.forEach((item, index) => {
    const row = document.createElement('tr');
    if (index % 2 === 1) row.classList.add('even-row');

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

function renderCards() {
  cardsContainer.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Категория:</strong> ${item.category}</p>
      <p><strong>Количество:</strong> ${item.quantity}</p>
      <p><strong>Цена:</strong> ${item.price} ₽</p>
      <button class="btn-delete" data-id="${item.id}">Удалить</button>
    `;
    cardsContainer.appendChild(card);
  });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  items.push({
    id: Date.now(),
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    quantity: Number(document.getElementById('quantity').value),
    price: Number(document.getElementById('price').value),
  });

  render();
  formEl.reset();
  document.getElementById('quantity').value = 1;
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const id = Number(e.target.dataset.id);
    items = items.filter(item => item.id !== id);
    render();
  }
});

btnTable.addEventListener('click', () => {
  tableView.classList.remove('hidden');
  cardsView.classList.add('hidden');
  btnTable.classList.add('active');
  btnCards.classList.remove('active');
});

btnCards.addEventListener('click', () => {
  cardsView.classList.remove('hidden');
  tableView.classList.add('hidden');
  btnCards.classList.add('active');
  btnTable.classList.remove('active');
});