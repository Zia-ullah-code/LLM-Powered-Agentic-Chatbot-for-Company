import React, { useState, useEffect, useRef } from 'react';

export default function ChatInput({ onSend, isOpen }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        borderTop: '1px solid #ddd'
      }}
    >
      <input
        ref={inputRef}
        style={{ flex: 1, padding: '8px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
    </form>
  );
}
