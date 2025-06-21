import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ChatList } from '../components/ChatList';
import type { Chat, User } from '../types';

export function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chats, setChats] = useState<(Chat & { otherUser: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndChats = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      // Buscar dados do usuário na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError || !userData) {
        console.error('Erro ao buscar usuário:', userError);
        navigate('/login');
        return;
      }

      setCurrentUser(userData);

      // Buscar chats onde o usuário participa (user1_id ou user2_id)
      const { data: chatsData, error: chatsError } = await supabase
        .from('chats')
        .select(`
          *,
          user1:user1_id(id, full_name, avatar_url),
          user2:user2_id(id, full_name, avatar_url)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

      if (chatsError) {
        console.error('Erro ao buscar chats:', chatsError);
        setChats([]);
      } else if (chatsData) {
        const formattedChats = chatsData.map((chat: any) => ({
          ...chat,
          otherUser: chat.user1_id === user.id ? chat.user2 : chat.user1,
        }));
        setChats(formattedChats);
      }

      setLoading(false);
    };

    fetchUserAndChats();

    const chatSubscription = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chats' },
        () => {
          fetchUserAndChats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatSubscription);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleNewChat = () => {
    navigate('/new-chat');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-md">
        <div className="bg-green-600 text-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">WhatsApp Clone</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNewChat}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <UserPlus className="w-6 h-6" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {chats.length > 0 ? (
          <ChatList chats={chats} currentUserId={currentUser?.id || ''} />
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No chats yet. Start a new conversation!</p>
            <button
              onClick={handleNewChat}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
