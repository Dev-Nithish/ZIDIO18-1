import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { User, Shield, Moon, Sun, BarChart3 } from 'lucide-react';

const AuthSelector = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const theme = {
    background: darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background} flex items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-3xl font-bold ${theme.text.primary} mb-2`}>
            Analytics Dashboard
          </h1>
          <p className={`${theme.text.secondary}`}>
            Choose your access level
          </p>
        </div>

        {/* Auth Options */}
        <div className="space-y-4 mb-8">
          <Link
            to="/login"
            className={`${theme.card} border rounded-2xl p-6 block transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${theme.text.primary} group-hover:text-blue-500 transition-colors duration-300`}>
                  User Login
                </h3>
                <p className={`text-sm ${theme.text.secondary}`}>
                  Access your analytics dashboard
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/login"
            className={`${theme.card} border rounded-2xl p-6 block transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${theme.text.primary} group-hover:text-purple-500 transition-colors duration-300`}>
                  Admin Access
                </h3>
                <p className={`text-sm ${theme.text.secondary}`}>
                  Administrative dashboard
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center">
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            } hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSelector;