'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface Message {
  id: number;
  text: string;
  time: Date;
  sender: 'me' | 'other';
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');

  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey! How are you doing?',
      time: '10:30 AM',
      unread: 2,
      avatar: '👨'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      lastMessage: 'See you tomorrow!',
      time: '9:45 AM',
      unread: 0,
      avatar: '👩'
    },
    {
      id: 3,
      name: 'Tech Group',
      lastMessage: 'Anyone up for coding?',
      time: 'Yesterday',
      unread: 5,
      avatar: '👥'
    },
    {
      id: 4,
      name: 'Mom',
      lastMessage: 'Don\'t forget to call me',
      time: 'Yesterday',
      unread: 1,
      avatar: '👵'
    },
    {
      id: 5,
      name: 'Work Team',
      lastMessage: 'Meeting at 3 PM',
      time: 'Monday',
      unread: 0,
      avatar: '💼'
    }
  ]);

  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({
    1: [
      { id: 1, text: 'Hey there!', time: new Date(2024, 0, 1, 10, 20), sender: 'other' },
      { id: 2, text: 'Hi! How are you?', time: new Date(2024, 0, 1, 10, 21), sender: 'me' },
      { id: 3, text: 'I\'m doing great! What about you?', time: new Date(2024, 0, 1, 10, 22), sender: 'other' },
      { id: 4, text: 'Pretty good, thanks for asking!', time: new Date(2024, 0, 1, 10, 23), sender: 'me' },
      { id: 5, text: 'Hey! How are you doing?', time: new Date(2024, 0, 1, 10, 30), sender: 'other' },
    ],
    2: [
      { id: 1, text: 'Let\'s meet tomorrow', time: new Date(2024, 0, 1, 9, 40), sender: 'me' },
      { id: 2, text: 'See you tomorrow!', time: new Date(2024, 0, 1, 9, 45), sender: 'other' },
    ],
    3: [
      { id: 1, text: 'Anyone up for coding?', time: new Date(2024, 0, 1, 8, 15), sender: 'other' },
    ],
    4: [
      { id: 1, text: 'Don\'t forget to call me', time: new Date(2024, 0, 1, 7, 30), sender: 'other' },
    ],
    5: [
      { id: 1, text: 'Meeting at 3 PM', time: new Date(2024, 0, 1, 14, 0), sender: 'other' },
    ]
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || selectedChat === null) return;

    const newMessage: Message = {
      id: (messages[selectedChat]?.length || 0) + 1,
      text: messageInput,
      time: new Date(),
      sender: 'me'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setMessageInput('');
  };

  const currentChat = chats.find(c => c.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-96 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <h1 className="text-xl font-semibold">Mustafizur Chat</h1>
          </div>
          <div className="flex space-x-4">
            <button className="hover:bg-[#128C7E] p-2 rounded-full transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/>
              </svg>
            </button>
            <button className="hover:bg-[#128C7E] p-2 rounded-full transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-2 bg-gray-50 border-b border-gray-300">
          <div className="bg-white rounded-lg flex items-center px-4 py-2 border border-gray-300">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              placeholder="Search or start new chat"
              className="ml-3 flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition ${
                selectedChat === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl mr-3">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-[#25D366] text-white text-xs rounded-full px-2 py-1 ml-2 min-w-[20px] text-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#ECE5DD]">
        {selectedChat && currentChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                  {currentChat.avatar}
                </div>
                <div>
                  <h2 className="font-semibold">{currentChat.name}</h2>
                  <p className="text-xs text-gray-200">Online</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="hover:bg-[#128C7E] p-2 rounded-full transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </button>
                <button className="hover:bg-[#128C7E] p-2 rounded-full transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path d="M10 2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              <div className="flex justify-center">
                <div className="bg-[#FFF4CE] rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm">
                  🔒 Messages are end-to-end encrypted
                </div>
              </div>
              {currentMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`message-bubble rounded-lg px-4 py-2 shadow-md ${
                      message.sender === 'me'
                        ? 'bg-[#DCF8C6] text-gray-900'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {format(message.time, 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="bg-[#F0F0F0] p-4 flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"/>
                </svg>
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message"
                className="flex-1 bg-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#25D366]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#128C7E] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Mustafizur Chat</h2>
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
