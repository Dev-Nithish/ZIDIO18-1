// src/components/Header.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  const getAvatar = () => {
    if (user?.avatar) return user.avatar;

    const initials = user?.name
      ? user.name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
      : 'U';

    return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&bold=true&rounded=true`;
  };

  return (
    <header className="bg-slate-900 text-white p-4 shadow-md flex items-center justify-between">
      <div className="text-lg font-semibold flex items-center space-x-2">
        <span role="img" aria-label="analytics">📊</span>
        <span>Excel Analytics</span>
      </div>

      <div className="flex items-center space-x-6">
        <Bell className="w-5 h-5 text-slate-300" />

        {/* User Dropdown */}
        <div className="relative group">
          <div className="flex items-center cursor-pointer space-x-2">
            <img
              src={getAvatar()}
              alt="avatar"
              className="w-8 h-8 rounded-full border border-white/20 object-cover"
            />
            <span className="text-sm font-medium truncate max-w-[100px]">{user?.name || 'User'}</span>
          </div>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
            <div className="p-4 border-b border-slate-200">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <ul className="py-2">
              <li className="flex items-center px-4 py-2 hover:bg-slate-100 cursor-pointer">
                <User className="w-4 h-4 mr-2" /> Profile
              </li>
              <li className="flex items-center px-4 py-2 hover:bg-slate-100 cursor-pointer">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </li>
              <li
                className="flex items-center px-4 py-2 text-red-600 hover:bg-slate-100 cursor-pointer"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
