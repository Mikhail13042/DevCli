import ItemCard from './ItemCard.jsx';

export default function ItemsCards({ items, onDelete, onUpdate }) {
  return (
    <div className="cards">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
