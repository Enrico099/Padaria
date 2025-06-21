import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

export function NewChat() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: currentUserData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      setCurrentUser(currentUserData);

      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .neq('id', user.id)
        .order('full_name');

      if (usersData) {
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, [navigate]);

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startChat = async (otherUser: User) => {
    if (!currentUser) return;

    // Check if chat already exists
    const { data: existingChat } = await supabase
      .from('chats')
      .select('id')
      .or(`and(user1_id.eq.${currentUser.id},user2_id.eq.${otherUser.id}),and(user1_id.eq.${otherUser.id},user2_id.eq.${currentUser.id})`)
      .single();

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
      return;
    }

    // Create new chat
    const { data: newChat, error } = await supabase
      .from('chats')
      .insert({
        user1_id: currentUser.id,
        user2_id: otherUser.id,
      })
      .select()
      .single();

    if (!error && newChat) {
      navigate(`/chat/${newChat.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-md">
        <div className="bg-green-600 text-white p-4 flex items-center">
          <button onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">New Chat</h1>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => startChat(user)}
                className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.full_name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                    {user.full_name[0]}
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="font-semibold">{user.full_name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}