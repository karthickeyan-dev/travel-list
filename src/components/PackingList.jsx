import { useState } from 'react';
import { Item } from './Item';

export function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === 'packed')
    sortedItems = items.toSorted(
      (a, b) => Number(a.isPacked) - Number(b.isPacked)
    );

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>
  );
}
