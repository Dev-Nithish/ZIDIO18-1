import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AuthSelector from './components/AuthSelector';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth" element={<AuthSelector />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
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
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Panel</h1>
                        <p className="text-slate-600 dark:text-slate-400">Administrative dashboard coming soon...</p>
                      </div>
                    </div>
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <AdminRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Management</h1>
                        <p className="text-slate-600 dark:text-slate-400">User management interface coming soon...</p>
                      </div>
                    </div>
                  </AdminRoute>
                } 
              />
              
              {/* Settings Route */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Settings</h1>
                        <p className="text-slate-600 dark:text-slate-400">Settings panel coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/auth" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;