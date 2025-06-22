import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Upload Page</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Reports Page</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Analytics Page</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">History Page</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Panel</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Management</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Settings</h1>
                        <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;