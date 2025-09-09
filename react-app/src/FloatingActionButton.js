import React from 'react';

export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#6200ea',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '24px',
        cursor: 'pointer'
      }}
    >
      💬
    </button>
  );
}
