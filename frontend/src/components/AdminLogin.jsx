import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Shield, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const theme = {
    background: darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate admin login
    setTimeout(() => {
      login({ id: 1, name: 'Admin User', email, role: 'admin' });
      navigate('/admin');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background} flex items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/auth"
          className={`inline-flex items-center space-x-2 ${theme.text.secondary} hover:${theme.text.primary} transition-colors duration-300 mb-8`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to options</span>
        </Link>

        {/* Admin Login Form */}
        <div className={`${theme.card} border rounded-3xl p-8 shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2`}>
              Admin Access
            </h2>
            <p className={`${theme.text.secondary}`}>
              Administrative dashboard login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-purple-500' 
                    : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                } focus:ring-2 focus:ring-purple-500/20 focus:outline-none`}
                placeholder="Enter admin email"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-purple-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                  } focus:ring-2 focus:ring-purple-500/20 focus:outline-none`}
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.text.secondary} hover:${theme.text.primary} transition-colors duration-300`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Admin Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;