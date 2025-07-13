import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, LogOut, Moon, Sun } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const theme = {
    background: darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    header: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className={`${theme.header} border-b backdrop-blur-xl sticky top-0 z-30 shadow-lg`}>
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                    darkMode 
                      ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h1 className={`text-xl font-bold ${theme.text.primary}`}>
                    Welcome back, {user?.name || 'User'}
                  </h1>
                  <p className={`text-sm ${theme.text.secondary}`}>
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}>
                  <Bell className="w-5 h-5" />
                </button>
                
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    darkMode 
                      ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  } hover:scale-105`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;