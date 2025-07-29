import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

function Card({ id, title, body, onDelete }) {
  return (
    <motion.div
      className="card"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{title}</h3>
      <p>{body}</p>
      <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
    </motion.div>
  );
}

export default Card;
