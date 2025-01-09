import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = function (newItem) {
    setItems(() => [...items, newItem]);
  };

  const handleDeleteItem = function (id) {
    setItems(() => items.filter(item => item.id !== id));
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
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>✈️ Far Away 🌴</h1>;
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
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

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items of your list, and you already packed X (X%)</em>
    </footer>
  );
}
