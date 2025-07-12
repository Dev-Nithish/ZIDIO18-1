import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from '../services/authService'; // Adjust the path as needed

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login for user or admin (API-based)
  const userLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const { user, token } = await loginUser({ email, password });
      localStorage.setItem('auth_token', token);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    return userLogin(email, password); // Backend determines role
  };

  // Registration
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const { user, token } = await registerUser({ name, email, password });
      localStorage.setItem('auth_token', token);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.permissions?.includes(permission) || false;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isUser = () => {
    return user?.role === 'user';
  };

  // Auto-login on page refresh if token exists
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      getCurrentUser(token)
        .then(({ user }) => setUser(user))
        .catch(() => {
          localStorage.removeItem('auth_token');
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userLogin,
        adminLogin,
        login: userLogin, // For backward compatibility
        register,
        logout,
        isLoading,
        hasPermission,
        isAdmin,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
