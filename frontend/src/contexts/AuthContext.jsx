import React, { createContext, useContext, useState } from 'react';

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

  // User login
  const userLogin = async (email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      role: 'user',
      type: 'user'
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  // Admin login
  const adminLogin = async (email, password) => {
  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token (optional: for future protected API requests)
    localStorage.setItem('token', data.token);

    const adminUser = {
      ...data.user,
      type: 'admin' // required for your isAdmin() helper
    };

    setUser(adminUser);
    setIsLoading(false);
    return adminUser;
  } catch (error) {
    setIsLoading(false);
    throw error;
  }
};

  // Legacy login method for backward compatibility
  const login = async (email, password) => {
    return userLogin(email, password);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      role: 'user',
      type: 'user'
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.permissions?.includes(permission) || false;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin' || user?.type === 'admin';
  };

  // Check if user is regular user
  const isUser = () => {
    return user?.role === 'user' || user?.type === 'user';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userLogin, 
      adminLogin, 
      login, // Keep for backward compatibility
      register, 
      logout, 
      isLoading,
      hasPermission,
      isAdmin,
      isUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};