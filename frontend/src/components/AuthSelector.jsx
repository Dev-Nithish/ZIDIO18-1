import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, User, Shield, ArrowRight } from 'lucide-react';

const AuthSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-lg mb-6">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Excel Analytics
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your access level to continue to the platform
          </p>
        </div>

        {/* Auth Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* User Login */}
          <Link
            to="/login"
            className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                User Access
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Access your analytics dashboard, upload data, and generate reports with standard user permissions.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  View personal analytics
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Upload and manage data
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Generate reports
                </div>
              </div>
              
              <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Continue as User
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Admin Login */}
          <Link
            to="/admin/login"
            className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-red-200/50 dark:border-red-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Admin Access
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Full administrative control with user management, system settings, and advanced analytics capabilities.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Manage all users
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  System configuration
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Advanced analytics
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                  <Shield className="w-3 h-3 text-red-600 dark:text-red-400 mr-1" />
                  <span className="text-xs font-medium text-red-700 dark:text-red-300">
                    Restricted
                  </span>
                </div>
                <div className="flex items-center text-red-600 dark:text-red-400 font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                  Admin Portal
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help? Contact support for assistance with your account access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSelector;