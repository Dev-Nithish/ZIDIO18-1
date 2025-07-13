import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserPlus, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      login({ id: 1, name: formData.name, email: formData.email });
      navigate('/dashboard');
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

        {/* Register Form */}
        <div className={`${theme.card} border rounded-3xl p-8 shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2`}>
              Create Account
            </h2>
            <p className={`${theme.text.secondary}`}>
              Join our analytics platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-green-500' 
                    : 'bg-white border-slate-300 text-slate-900 focus:border-green-500'
                } focus:ring-2 focus:ring-green-500/20 focus:outline-none`}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-green-500' 
                    : 'bg-white border-slate-300 text-slate-900 focus:border-green-500'
                } focus:ring-2 focus:ring-green-500/20 focus:outline-none`}
                placeholder="Enter your email"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-green-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-green-500'
                  } focus:ring-2 focus:ring-green-500/20 focus:outline-none`}
                  placeholder="Create a password"
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

            <div>
              <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-green-500' 
                    : 'bg-white border-slate-300 text-slate-900 focus:border-green-500'
                } focus:ring-2 focus:ring-green-500/20 focus:outline-none`}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${theme.text.secondary}`}>
              Already have an account?{' '}
              <Link to="/login" className="text-green-500 hover:text-green-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;