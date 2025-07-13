import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Upload, 
  TrendingUp, 
  FileSpreadsheet, 
  Users, 
  Activity
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const theme = {
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600',
      muted: darkMode ? 'text-slate-400' : 'text-slate-500'
    }
  };


  const stats = [
    { label: 'Total Charts', value: '24', icon: BarChart3, color: 'from-blue-500 to-cyan-600' },
    { label: 'Files Uploaded', value: '156', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-600' },
    { label: 'Data Points', value: '12.5K', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    { label: 'Active Users', value: '89', icon: Users, color: 'from-orange-500 to-red-600' }
  ];

  const quickActions = [
    {
      title: 'Upload Excel File',
      description: 'Upload and analyze your Excel data',
      icon: Upload,
      action: () => navigate('/upload'),
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'View Analytics',
      description: 'Explore your data visualizations',
      icon: Activity,
      action: () => navigate('/upload'),
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${theme.card} border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 group`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-3xl font-bold ${theme.text.primary} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${theme.text.secondary} mt-1`}>{stat.label}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className={`${theme.card} border rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer`} onClick={action.action}>
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${theme.text.primary} mb-2 group-hover:text-blue-500 transition-colors duration-300`}>
                    {action.title}
                  </h3>
                  <p className={`${theme.text.secondary} leading-relaxed`}>
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className={`${theme.card} border rounded-3xl p-8 shadow-xl`}>
          <h2 className={`text-2xl font-bold ${theme.text.primary} mb-6 flex items-center space-x-3`}>
            <Activity className="w-6 h-6" />
            <span>Recent Activity</span>
          </h2>
          
          <div className="space-y-4">
            {[
              { action: 'Uploaded sales_data.xlsx', time: '2 hours ago', type: 'upload' },
              { action: 'Created bar chart visualization', time: '4 hours ago', type: 'chart' },
              { action: 'Exported analytics report', time: '1 day ago', type: 'export' },
              { action: 'Shared dashboard with team', time: '2 days ago', type: 'share' }
            ].map((activity, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50/50 hover:bg-slate-100/80'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'chart' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'export' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'upload' ? <Upload className="w-5 h-5" /> :
                   activity.type === 'chart' ? <BarChart3 className="w-5 h-5" /> :
                   activity.type === 'export' ? <FileSpreadsheet className="w-5 h-5" /> :
                   <Users className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${theme.text.primary}`}>{activity.action}</p>
                  <p className={`text-sm ${theme.text.muted}`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;