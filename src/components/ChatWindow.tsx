import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Message, User } from '../types';
import { supabase } from '../lib/supabase';

interface ChatWindowProps {
  chatId: string;
  currentUser: User;
  otherUser: User;
  messages: Message[];
}

export function ChatWindow({ chatId, currentUser, otherUser, messages }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: currentUser.id,
      content: newMessage.trim(),
      read: false,
      timestamp: new Date().toISOString(),
    });

    if (!error) {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/')} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          {otherUser.avatarUrl ? (
            <img
              src={otherUser.avatarUrl}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              {otherUser.name ? otherUser.name[0] : '?'}
            </div>
          )}
          <span className="ml-3 font-semibold">{otherUser.name}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUser.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="break-words">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.senderId === currentUser.id ? 'text-green-100' : 'text-gray-500'
                }`}
              >
                {format(new Date(message.timestamp), 'HH:mm')}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-lg mr-2 focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-green-500 text-white p-2 rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
