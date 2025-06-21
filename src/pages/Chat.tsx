import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChatWindow } from '../components/ChatWindow';
import type { Message, User } from '../types';

export function Chat() {
  const { id: chatId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      setCurrentUser(userData);

      const { data: chatData } = await supabase
        .from('chats')
        .select(`
          *,
          user1:user1_id(*),
          user2:user2_id(*)
        `)
        .eq('id', chatId)
        .single();

      if (chatData) {
        const otherUserData = chatData.user1_id === user.id ? chatData.user2 : chatData.user1;
        setOtherUser(otherUserData);
      }

      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (messagesData) {
        setMessages(messagesData);
      }

      setLoading(false);
    };

    fetchChatData();

    const messagesSubscription = supabase
      .channel(`messages:${chatId}`)
      .on('*', () => {
        fetchChatData();
      })
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [chatId, navigate]);

  if (loading || !currentUser || !otherUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-md">
        <ChatWindow
          chatId={chatId || ''}
          currentUser={currentUser}
          otherUser={otherUser}
          messages={messages}
        />
      </div>
    </div>
  );
}