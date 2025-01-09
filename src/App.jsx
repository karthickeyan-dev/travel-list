import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = function (newItem) {
    setItems(() => [...items, newItem]);
  };

  const handleDeleteItem = function (id) {
    setItems(() => items.filter(item => item.id !== id));
  };

  const handleClearList = function () {
    setItems([]);
  };

  const handleToggleItem = function (id) {
    setItems(() =>
      items.map(item =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Far Away 🌴</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      quantity,
      description,
      isPacked: false,
      id: Date.now(),
    };

    onAddItem(newItem);

    setQuantity(1);
    setDescription('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.isPacked}
        onClick={() => onToggleItem(item.id)}
      ></input>
      <span style={item.isPacked ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter(item => item.isPacked).length;
  const percentage = Math.ceil((numPacked / numItems) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything packed, Ready to go ✈️'
          : `💼 You have ${numItems} items of your list, and you already pack ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
