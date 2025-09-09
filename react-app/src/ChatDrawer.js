import React from 'react';
import { motion } from 'framer-motion';

export default function ChatDrawer({ isOpen, onClose, onClear, children, inputArea }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '320px',
        height: '400px',
        background: '#fff',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '8px 0 0 0',
        overflow: 'hidden',
        zIndex: 999
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          borderBottom: '1px solid #ddd',
          background: '#f7f7f7',
          fontWeight: 'bold'
        }}
      >
        Chat
        <div>
          <button
            onClick={onClear}
            style={{
              marginRight: '8px',
              background: '#eee',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px'
            }}
          >
            Clear
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ✖
          </button>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {children}
      </div>

      {/* Fixed Input Area */}
      <div style={{ borderTop: '1px solid #ddd' }}>
        {inputArea}
      </div>
    </motion.div>
  );
}
