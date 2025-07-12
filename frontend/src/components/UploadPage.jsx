import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ExcelUpload from './ExcelUpload';
import { FileSpreadsheet, TrendingUp, Users, Database, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [uploadStats, setUploadStats] = React.useState({
    totalUploads: 0,
    successfulUploads: 0,
    totalRows: 0,
    lastUpload: null
  });

  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data);
    setUploadStats(prev => ({
      ...prev,
      totalUploads: prev.totalUploads + 1,
      successfulUploads: prev.successfulUploads + 1,
      lastUpload: new Date().toISOString()
    }));
  };

  const handleUploadError = (error) => {
    console.error('Upload failed:', error);
    setUploadStats(prev => ({
      ...prev,
      totalUploads: prev.totalUploads + 1
    }));
  };

  const theme = {
    background: darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    card: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600',
      muted: darkMode ? 'text-slate-400' : 'text-slate-500'
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background}`}>
      {/* Header */}
      <div className={`${theme.card} border-b transition-all duration-300 backdrop-blur-sm sticky top-0 z-40 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                } hover:scale-105`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileSpreadsheet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme.text.primary} bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent`}>
                  Excel Upload Center
                </h1>
                <p className={`text-sm ${theme.text.secondary} mt-1`}>
                  Advanced file processing with real-time analytics
                </p>
              </div>
            </div>
            
            {/* Header Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <p className={`text-2xl font-bold ${theme.text.primary}`}>
                  {uploadStats.totalUploads}
                </p>
                <p className={`text-xs ${theme.text.muted}`}>Total Uploads</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-green-500`}>
                  {uploadStats.successfulUploads}
                </p>
                <p className={`text-xs ${theme.text.muted}`}>Successful</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-blue-500`}>
                  {Math.round((uploadStats.successfulUploads / Math.max(uploadStats.totalUploads, 1)) * 100)}%
                </p>
                <p className={`text-xs ${theme.text.muted}`}>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Component */}
        <div className="mb-12">
          <ExcelUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            darkMode={darkMode}
            className="mx-auto"
          />
        </div>

        {/* Advanced Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features Section */}
          <div className={`${theme.card} border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme.text.primary} flex items-center space-x-3`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span>Advanced Features</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Drag & Drop Interface', 
                  desc: 'Intuitive multi-file drag and drop with visual feedback',
                  icon: '🎯',
                  color: 'from-blue-500 to-cyan-600'
                },
                { 
                  title: 'File Validation', 
                  desc: 'Automatic Excel file type and size validation',
                  icon: '✅',
                  color: 'from-green-500 to-emerald-600'
                },
                { 
                  title: 'Progress Tracking', 
                  desc: 'Detailed upload progress with animated indicators',
                  icon: '📊',
                  color: 'from-purple-500 to-pink-600'
                },
                { 
                  title: 'Batch Processing', 
                  desc: 'Upload multiple files simultaneously with queue management',
                  icon: '⚡',
                  color: 'from-yellow-500 to-orange-600'
                },
                { 
                  title: 'Error Handling', 
                  desc: 'Comprehensive error detection with retry mechanisms',
                  icon: '🛡️',
                  color: 'from-red-500 to-pink-600'
                },
                { 
                  title: 'Theme Support', 
                  desc: 'Beautiful themes with smooth transitions',
                  icon: '🌙',
                  color: 'from-indigo-500 to-purple-600'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 group cursor-pointer ${
                    darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50/50 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-lg shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${theme.text.primary} group-hover:text-blue-500 transition-colors duration-300`}>
                        {feature.title}
                      </h3>
                      <p className={`text-xs ${theme.text.muted} leading-relaxed`}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className={`${theme.card} border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme.text.primary} flex items-center space-x-3`}>
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span>Upload Analytics</span>
            </h2>

            {/* Stats Cards */}
            <div className="space-y-4 mb-6">
              {[
                {
                  label: 'Total Files Processed',
                  value: uploadStats.totalUploads,
                  icon: FileSpreadsheet,
                  color: 'text-blue-500',
                  bg: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  label: 'Successful Uploads',
                  value: uploadStats.successfulUploads,
                  icon: TrendingUp,
                  color: 'text-green-500',
                  bg: 'from-green-500/10 to-emerald-500/10'
                },
                {
                  label: 'Success Rate',
                  value: `${Math.round((uploadStats.successfulUploads / Math.max(uploadStats.totalUploads, 1)) * 100)}%`,
                  icon: Users,
                  color: 'text-purple-500',
                  bg: 'from-purple-500/10 to-pink-500/10'
                }
              ].map(({ label, value, icon: Icon, color, bg }, index) => (
                <div key={index} className={`p-4 rounded-2xl bg-gradient-to-r ${bg} border ${darkMode ? 'border-slate-600' : 'border-slate-200'} transition-all duration-300 hover:scale-105`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${theme.text.primary}`}>{value}</p>
                      <p className={`text-sm ${theme.text.secondary}`}>{label}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Last Upload Info */}
            {uploadStats.lastUpload && (
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50/50'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                <h3 className={`font-semibold ${theme.text.primary} mb-2`}>Last Upload</h3>
                <p className={`text-sm ${theme.text.secondary}`}>
                  {new Date(uploadStats.lastUpload).toLocaleString()}
                </p>
              </div>
            )}

            {/* Tips Section */}
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
              <h3 className={`font-semibold ${theme.text.primary} mb-3`}>Pro Tips</h3>
              <ul className="space-y-2">
                {[
                  'Use .xlsx format for better compatibility',
                  'Keep file sizes under 50MB for optimal performance',
                  'Batch upload multiple files for efficiency'
                ].map((tip, index) => (
                  <li key={index} className={`text-sm ${theme.text.secondary} flex items-center space-x-2`}>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;