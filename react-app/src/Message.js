import React from 'react';

export default function Message({ text, sender, onFeedback }) {
  const isBot = sender === 'bot';

  const handleThumb = (sentiment) => {
    if (onFeedback) {
      onFeedback(text, sentiment);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
        margin: '4px 0'
      }}
    >
      {/* Message Bubble */}
      <div
        style={{
          background: sender === 'user' ? '#daf8cb' : '#f1f0f0',
          padding: '8px 12px',
          borderRadius: '16px',
          maxWidth: '80%',
          wordBreak: 'break-word'
        }}
      >
        {text}
      </div>

      {/* Feedback buttons for bot messages */}
      {isBot && (
        <div style={{ marginTop: '4px', display: 'flex', gap: '4px' }}>
          <button
            onClick={() => handleThumb('positive')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            👍
          </button>
          <button
            onClick={() => handleThumb('negative')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
}
