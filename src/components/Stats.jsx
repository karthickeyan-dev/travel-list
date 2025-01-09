export function Stats({ items }) {
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
