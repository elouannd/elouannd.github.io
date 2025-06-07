import React, { useState, useEffect } from 'react';

function RotatingText({ messages = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages, interval]);

  return <span className="rotating-text">{messages[index] || ''}</span>;
}

export default RotatingText;
