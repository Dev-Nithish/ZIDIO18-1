import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AuthSelector from './components/AuthSelector';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import UploadPage from './components/UploadPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<AuthSelector />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/login-old" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <UploadPage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Reports</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Analytics</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">History</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Settings</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Dashboard</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </AdminRoute>
                } 
              />
              
              <Route 
                path="/admin/users" 
                element={
                  <AdminRoute>
                    <Layout>
                      <div className="p-6">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Management</h1>
                          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
                        </div>
                      </div>
                    </Layout>
                  </AdminRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;