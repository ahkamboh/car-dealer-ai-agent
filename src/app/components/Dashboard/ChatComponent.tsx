// components/ChatComponent.tsx
import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'guest';
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Good morning', sender: 'guest' },
    { id: 2, text: 'Can you arrange schedule for next meeting?', sender: 'guest' },
    { id: 3, text: 'Very Good morning', sender: 'user' },
    { id: 4, text: 'Okay, I’ll arrange it soon. I notify you when it’s done +91-235 2574 2566 kk Sharma pan card eee72063i', sender: 'guest' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    const nextId = messages.length + 1;
    setMessages([...messages, { id: nextId, text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  return (
  
      <div className=" text-white rounded-md bg-[#242424] border border-[#5c5a5acb] p-2 ">
        <div className="p-4 border-b border-[#5c5a5acb]">
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>
        <div className="p-4 h-96 overflow-y-auto">
          {/* Messages display */}
          {messages.map((message) => (
            <div key={message.id} className={`flex pt-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600' : 'bg-[#444444] '}`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded p-2 mr-2"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>

  );
};

export default ChatComponent;
