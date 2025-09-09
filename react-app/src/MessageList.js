import React, { useEffect, useRef } from 'react';

function MessageList({ messages, onFeedback }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to safely parse JSON
  const parseContent = (text) => {
    try {
      const parsed = JSON.parse(text);

      // If array, take first object
      const obj = Array.isArray(parsed) ? parsed[0] : parsed;

      // Clarification message
    //   if (obj.type === "clarification") {
    //     return <i>{obj.message}</i>;
    //   }
    if (obj.type === "clarification") {
    return (<div style={{padding: '10px',background: '#fff8e1',        // light yellow background
      borderRadius: '10px',
      border: '1px solid #ffd54f',
      color: '#8d6e63',
      fontStyle: 'italic',
      maxWidth: '80%'
    }}>
      {obj.message}
    </div>
  );
}

      // Answer type (with sources)
      if (obj.type === "answer") {
        return (
          <div>
            {obj.answer.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {obj.sources?.length > 0 && (
              <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
                Sources: {obj.sources.join(", ")}
              </div>
            )}
          </div>
        );
      }

      // Escalation message
    if (obj.type === "escalation") {
      return (
        <div style={{
          padding: '10px',
          background: '#fdecea', // light red/pink background
          borderRadius: '10px',
          border: '1px solid #f5c2c0',
          color: '#b71c1c',
          maxWidth: '80%'
        }}>
          <p>{obj.message}</p>
          <div style={{ marginTop: '8px' }}>
            <button
              style={{
                marginRight: '8px',
                padding: '6px 12px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => window.open(obj.booking_link, '_blank')}
            >
              Yes, book a meeting
            </button>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#e0e0e0',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => console.log("User declined meeting")}
            >
              No, thanks
            </button>
          </div>
        </div>
      );
    }


      // Fallback: show full object as pretty JSON
      return <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{JSON.stringify(obj, null, 2)}</pre>;
    } catch {
      return text; // Not JSON → show as plain text
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      {messages.map((msg, index) => (
        <div key={index} style={{
          margin: '8px 0',
          display: 'flex',
          flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
        }}>
          <div style={{
            background: msg.sender === 'user' ? '#1976d2' : '#f1f1f1',
            color: msg.sender === 'user' ? 'white' : 'black',
            padding: '10px',
            borderRadius: '10px',
            maxWidth: '80%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            position: 'relative'
          }}>
            {parseContent(msg.text)}
            {msg.sender === 'bot' && msg.type !== 'clarification' && (
              <div style={{ marginTop: '5px', fontSize: '12px' }}>
                <span
                  style={{ cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => onFeedback(msg.text, 'positive')}
                >👍</span>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => onFeedback(msg.text, 'negative')}
                >👎</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default MessageList;
