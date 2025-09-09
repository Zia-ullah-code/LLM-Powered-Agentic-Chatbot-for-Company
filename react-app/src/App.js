import React, { useState, useEffect } from 'react';
import FloatingActionButton from './FloatingActionButton';
import ChatDrawer from './ChatDrawer';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  // Create or load conversation_id
  useEffect(() => {
    let existingId = sessionStorage.getItem('conversation_id');
    if (!existingId) {
      existingId = Date.now().toString();
      sessionStorage.setItem('conversation_id', existingId);
    }
    setConversationId(existingId);
  }, []);

  // Load chat history from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse chat history:", err);
      }
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chat_history', JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setLoading(true);

    try {
      const res = await fetch('/webhook/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, conversation_id: conversationId })
      });

      const predictData = await res.json();
      const { intent, entities } = predictData[0] || {};
      let botResponse = {};

      if (intent === 'request_estimate') {
        const estRes = await fetch('/webhook/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...entities, pages: 12, conversation_id: conversationId })
        });
        botResponse = await estRes.json();
      } 
      else if (intent === 'general_question') {
        const answerRes = await fetch('/webhook/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, conversation_id: conversationId })
        });
        botResponse = await answerRes.json();
      } 
      else {
        botResponse = { message: "I can help with that!" };
      }

      setMessages(prev => [...prev, { text: JSON.stringify(botResponse), sender: 'bot' }]);
    } catch (err) {
      console.error("Error in handleSend:", err);
    }

    setLoading(false);
  };

  const handleClear = async () => {
    await fetch('/webhook/reset', { method: 'POST' });
    setMessages([]);
    sessionStorage.removeItem('chat_history');
    console.log("Cleared chat history");
  };

  const handleFeedback = async (text, sentiment) => {
    await fetch('/webhook/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sentiment, conversation_id: conversationId })
    });
  };

  return (
    <>
      <FloatingActionButton onClick={() => setIsOpen(!isOpen)} />
      <ChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClear={handleClear}
        inputArea={<ChatInput onSend={handleSend} />}
      >
        <MessageList messages={messages} onFeedback={handleFeedback} />
        {loading && <div style={{ padding: '8px', fontStyle: 'italic' }}>Bot is typing...</div>}
      </ChatDrawer>
    </>
  );
}

export default App;
