import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { User as UserIcon } from 'lucide-react';
import type { Chat, User } from '../types';

interface ChatListProps {
  chats: (Chat & { otherUser: User })[];
  currentUserId: string;
}

export function ChatList({ chats, currentUserId }: ChatListProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b"
          onClick={() => navigate(`/chat/${chat.id}`)}
        >
          {chat.otherUser.avatarUrl ? (
            <img
              src={chat.otherUser.avatarUrl}
              alt={chat.otherUser.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-gray-500" />
            </div>
          )}
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{chat.otherUser.name}</h3>
              {chat.last_message_at && !isNaN(new Date(chat.last_message_at).getTime()) && (
                <span className="text-sm text-gray-500">
                  {format(new Date(chat.last_message_at), 'HH:mm')}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">
              {chat.last_message || 'No messages yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
