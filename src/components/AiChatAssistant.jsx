import React, { useState } from 'react';

const AiChatAssistant = ({ themeColor = "#6c5ce7" }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Salam! Mən sizə necə kömək edə bilərəm?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: 'ai', text: 'Sualınızı aldım! Əlavə kömək üçün buradayam.' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div
          className="bg-white shadow-2xl rounded-2xl w-80 h-96 flex flex-col"
          style={{
            border: 'none',
            boxShadow: `0 8px 32px 0 ${themeColor}30`,
            overflow: 'hidden'
          }}
        >
          <div
            className="px-4 py-3 flex justify-between items-center"
            style={{
              backgroundColor: themeColor,
              color: '#fff',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
              boxShadow: `0 2px 8px 0 ${themeColor}18`,
              border: 'none'
            }}
          >
            <span className="font-semibold tracking-wide flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                <circle cx="10" cy="10" r="9" />
                <path d="M7 10h6M10 7v6" />
              </svg>
              AI Chat Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl font-bold hover:text-purple-200 transition"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0 0.5rem'
              }}
            >
              &times;
            </button>
          </div>
          <div
            className="flex-1 p-4 overflow-y-auto pb-4"
            style={{
              backgroundColor: '#f3f0ff'
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 text-sm flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <span
                  className={
                    msg.sender === 'ai'
                      ? 'px-3 py-2 rounded-2xl max-w-[70%] shadow'
                      : 'px-3 py-2 rounded-2xl max-w-[70%] shadow'
                  }
                  style={
                    msg.sender === 'ai'
                      ? {
                          backgroundColor: '#dfe6fd',
                          color: themeColor,
                          border: `1px solid #b2a4ff`
                        }
                      : {
                          backgroundColor: themeColor,
                          color: '#fff',
                          border: `1px solid #b2a4ff`
                        }
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div
            className="p-3 flex items-center gap-2 bg-white"
            style={{
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              boxShadow: `0 -2px 8px 0 ${themeColor}12`
            }}
          >
            <input
              type="text"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none transition"
              style={{
                borderColor: '#b2a4ff',
                minWidth: 0,
                boxShadow: `0 0 0 2px ${themeColor}22`,
                background: '#f3f0ff'
              }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Mesajınızı yazın..."
            />
            <button
              onClick={handleSend}
              className="rounded-lg font-semibold shadow transition"
              style={{
                backgroundColor: themeColor,
                color: '#fff',
                height: '40px',
                minWidth: '80px',
                maxWidth: '100%',
                border: 'none',
                boxShadow: `0 2px 8px 0 ${themeColor}18`
              }}
            >
              Göndər
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full shadow-2xl p-4 flex items-center justify-center hover:scale-105 transition"
          aria-label="Open AI Chat Assistant"
          style={{ backgroundColor: themeColor, color: '#fff', border: 'none' }}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="14" cy="14" r="12" />
            <path d="M9 14h10M14 9v10" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AiChatAssistant;
