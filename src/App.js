import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 New state for loader

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then((res) => res.json())
      .then((data) => {
        const readableData = data.map((item) => ({
          id: item.id,
          title: item.title, // 🔹 Using original API English title
          body: item.body,
        }));
        setCards(readableData);
        setLoading(false); // 🔹 Loader ends
      });
  }, []);

  const deleteCard = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      title: `New Card ${cards.length + 1}`,
      body: 'This is a new card added by the user.',
    };
    setCards(prev => [...prev, newCard]);
  };

  return (
    <div className="App">
      <h1>Card UI App</h1>
      <button className="add-button" onClick={addCard}>Add Card</button>

      {loading ? (
        <p className="loader">Loading cards...</p> // 🔹 Loader UI
      ) : (
        <div className="card-container">
          <AnimatePresence>
            {cards.map(card => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                body={card.body}
                onDelete={deleteCard}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default App;
