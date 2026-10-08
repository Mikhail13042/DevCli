# Спортивный инвентарь (Vite + React)

Запуск:

    npm install
    npm run dev

Тестовые аккаунты: `admin / 123`, `user / 456`.

Структура:
- `src/services/accounts.js` — объект с аккаунтами пользователей
- `src/services/inventoryService.js` — сервис данных (объект InventoryAPI)
- `src/App.jsx` — корневой компонент: state пользователя + React Router
- `src/pages/LoginPage.jsx` — страница входа
- `src/pages/InventoryPage.jsx` — страница просмотра
- `src/components/ItemsTable.jsx` — представление «таблица» (+ чередование строк, редактирование)
- `src/components/ItemsCards.jsx`, `ItemCard.jsx` — представление «карточки»
- `src/components/AddItemForm.jsx` — форма добавления
