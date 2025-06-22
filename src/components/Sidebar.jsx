import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  History, 
  Shield, 
  Settings,
  BarChart3,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Upload Data',
      href: '/upload',
      icon: Upload,
      current: location.pathname === '/upload'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: FileText,
      current: location.pathname === '/reports'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      current: location.pathname === '/analytics'
    },
    {
      name: 'History',
      href: '/history',
      icon: History,
      current: location.pathname === '/history'
    }
  ];

  const adminItems = [
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      current: location.pathname === '/admin/users'
    },
    {
      name: 'Admin Panel',
      href: '/admin',
      icon: Shield,
      current: location.pathname === '/admin'
    }
  ];

  const bottomItems = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      current: location.pathname === '/settings'
    }
  ];

  const NavItem = ({ item, compact = false }) => (
    <Link
      to={item.href}
      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
        item.current
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <item.icon 
        className={`flex-shrink-0 ${compact ? 'w-5 h-5' : 'w-5 h-5 mr-3'} ${
          item.current ? 'text-blue-600 dark:text-blue-400' : ''
        }`} 
      />
      {!compact && (
        <span className="truncate">{item.name}</span>
      )}
      {compact && (
        <span className="absolute left-14 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
          {item.name}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-16'
        } lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            {isOpen && (
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Analytics
                </span>
              </div>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-2">
              {!isOpen && navigationItems.length > 0 && (
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-slate-200 dark:bg-slate-700" />
                </div>
              )}
              {navigationItems.map((item) => (
                <NavItem key={item.name} item={item} compact={!isOpen} />
              ))}
            </div>

            {/* Admin Section */}
            {user?.role === 'admin' && (
              <div className="space-y-2">
                {isOpen && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Administration
                    </h3>
                  </div>
                )}
                {!isOpen && (
                  <div className="relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-slate-200 dark:bg-slate-700" />
                  </div>
                )}
                {adminItems.map((item) => (
                  <NavItem key={item.name} item={item} compact={!isOpen} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              {bottomItems.map((item) => (
                <NavItem key={item.name} item={item} compact={!isOpen} />
              ))}
            </div>

            {/* User Info */}
            {isOpen && (
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;