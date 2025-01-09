import { useState } from 'react';
import { Logo } from './components/Logo';
import { Form } from './components/Form';
import { PackingList } from './components/PackingList';
import { Stats } from './components/Stats';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = function (newItem) {
    setItems(() => [...items, newItem]);
  };

  const handleDeleteItem = function (id) {
    setItems(() => items.filter(item => item.id !== id));
  };

  const handleClearList = function () {
    const confirmed = window.confirm('Are you sure you want to 🗑️ clear list');
    if (confirmed) setItems([]);
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
