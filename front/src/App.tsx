import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState<any>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/items/1')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateItem = () => {
    axios.post('http://127.0.0.1:8000/items/', newItem)
      .then((response) => {
        console.log(response.data);
        setItems([...items, response.data]);
        setNewItem({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>FastAPI and React Example</h1>
      <h2>Create Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <button onClick={handleCreateItem}>Create Item</button>
    </div>
  );
}

export default App;