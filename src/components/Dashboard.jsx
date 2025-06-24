// Dashboard.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { DollarSign, Users, FileText, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, BarChart3, PieChart, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', changeType: 'positive', icon: DollarSign },
    { name: 'Active Users', value: '2,350', change: '+15.3%', changeType: 'positive', icon: Users },
    { name: 'Reports Generated', value: '1,234', change: '-2.5%', changeType: 'negative', icon: FileText },
    { name: 'Conversion Rate', value: '12.5%', change: '+5.2%', changeType: 'positive', icon: TrendingUp },
  ];

  const recentActivity = [
    { id: 1, action: 'New report generated', user: 'Sarah Johnson', time: '2 minutes ago', type: 'report' },
    { id: 2, action: 'Data uploaded successfully', user: 'Mike Chen', time: '1 hour ago', type: 'upload' },
    { id: 3, action: 'Dashboard accessed', user: 'Emma Davis', time: '3 hours ago', type: 'access' },
    { id: 4, action: 'Export completed', user: 'Alex Wilson', time: '5 hours ago', type: 'export' },
  ];

  const StatCard = ({ stat }) => (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{stat.name}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-xl ${stat.changeType === 'positive' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <stat.icon className={`w-6 h-6 ${stat.changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {stat.changeType === 'positive' ? <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" /> : <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />}
        <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{stat.change}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">from last month</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 mt-16 p-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Here's what's happening with your analytics today.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl border dark:border-slate-700/20">
              <div className="flex justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Revenue Overview</h3>
                <BarChart3 className="w-5 h-5 text-slate-400" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                <Activity className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl border dark:border-slate-700/20">
              <div className="flex justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
                <PieChart className="w-15 h-205 text-slate-400" />
              </div>
              <div className="space-y-4">
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl">Generate New Report</button>
                <button className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl">Upload Data</button>
                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl">Schedule Analysis</button>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl border dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
