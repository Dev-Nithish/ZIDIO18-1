import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BarChart3, LineChart, ScatterChart as Scatter, TrendingUp, Database, FileSpreadsheet } from 'lucide-react';

// Import components
import ExcelUpload from './ExcelUpload';
import AxisSelector from './AxisSelector';
import Chart2DRenderer from './Chart2DRenderer';
import Chart3DRenderer from './Chart3DRenderer';

const UploadPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  // State management
  const [uploadedData, setUploadedData] = useState(null);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [zAxis, setZAxis] = useState('');
  const [chartType, setChartType] = useState('line');

  const theme = {
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600',
      muted: darkMode ? 'text-slate-400' : 'text-slate-500'
    }
  };

  // Handle file upload
  const handleFileUpload = (data) => {
    setUploadedData(data);
    // Auto-select first two columns if available
    if (data.headers.length >= 2) {
      setXAxis(data.headers[0]);
      setYAxis(data.headers[1]);
      if (data.headers.length >= 3) {
        setZAxis(data.headers[2]);
      }
    }
  };

  // Chart type options
  const chartTypes = [
    { type: 'line', label: 'Line Chart', icon: LineChart, color: 'from-blue-500 to-cyan-600' },
    { type: 'bar', label: 'Bar Chart', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
    { type: 'scatter', label: 'Scatter Plot', icon: Scatter, color: 'from-green-500 to-emerald-600' }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme.text.primary} bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2`}>
            Analytics Dashboard
          </h1>
          <p className={`text-lg ${theme.text.secondary}`}>
            Upload Excel files and create beautiful visualizations
          </p>
          
          {uploadedData && (
            <div className="flex items-center space-x-6 mt-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${theme.text.primary}`}>
                  {uploadedData.data.length}
                </p>
                <p className={`text-xs ${theme.text.muted}`}>Data Points</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-blue-500`}>
                  {uploadedData.headers.length}
                </p>
                <p className={`text-xs ${theme.text.muted}`}>Columns</p>
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <section>
          <div className="mb-6">
            <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2 flex items-center space-x-3`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-white" />
              </div>
              <span>1. Upload Excel File</span>
            </h2>
            <p className={`${theme.text.secondary}`}>
              Upload your Excel file (.xls, .xlsx, or .csv) to get started with data visualization
            </p>
          </div>
          
          <ExcelUpload
            onFileUpload={handleFileUpload}
            darkMode={darkMode}
            className="max-w-4xl mx-auto"
          />
        </section>

        {/* Configuration Section */}
        {uploadedData && (
          <>
            <section>
              <div className="mb-6">
                <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2 flex items-center space-x-3`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <span>2. Configure Chart Axes</span>
                </h2>
                <p className={`${theme.text.secondary}`}>
                  Select which columns to use for your chart axes
                </p>
              </div>
              
              <AxisSelector
                headers={uploadedData.headers}
                xAxis={xAxis}
                yAxis={yAxis}
                zAxis={zAxis}
                onXAxisChange={setXAxis}
                onYAxisChange={setYAxis}
                onZAxisChange={setZAxis}
                darkMode={darkMode}
                show3D={true}
                className="max-w-4xl mx-auto"
              />
            </section>

            {/* Chart Type Selector */}
            <section>
              <div className="mb-6">
                <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2 flex items-center space-x-3`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span>3. Choose Chart Type</span>
                </h2>
                <p className={`${theme.text.secondary}`}>
                  Select the visualization type that best represents your data
                </p>
              </div>
              
              <div className={`${theme.card} border rounded-2xl p-6 shadow-lg max-w-4xl mx-auto`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {chartTypes.map(({ type, label, icon: Icon, color }) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        chartType === type
                          ? `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} shadow-lg`
                          : `border-transparent ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'}`
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`font-medium ${theme.text.primary}`}>{label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Charts Section */}
            {xAxis && yAxis && (
              <section>
                <div className="mb-6">
                  <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2 flex items-center space-x-3`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span>4. Data Visualizations</span>
                  </h2>
                  <p className={`${theme.text.secondary}`}>
                    Interactive charts generated from your data
                  </p>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* 2D Chart */}
                  <Chart2DRenderer
                    data={uploadedData.data}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    chartType={chartType}
                    fileName={uploadedData.fileName}
                    darkMode={darkMode}
                  />

                  {/* 3D Chart */}
                  <Chart3DRenderer
                    data={uploadedData.data}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    zAxis={zAxis}
                    fileName={uploadedData.fileName}
                    darkMode={darkMode}
                  />
                </div>
              </section>
            )}
          </>
        )}

        {/* Getting Started Guide */}
        {!uploadedData && (
          <section className={`${theme.card} border rounded-3xl p-8 shadow-xl max-w-4xl mx-auto`}>
            <h2 className={`text-2xl font-bold ${theme.text.primary} mb-6 text-center`}>
              Getting Started
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Upload Your Data',
                  description: 'Drag and drop or select your Excel file (.xls, .xlsx, or .csv)',
                  icon: FileSpreadsheet,
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  step: '2',
                  title: 'Configure Axes',
                  description: 'Select which columns to use for X, Y, and optionally Z axes',
                  icon: Database,
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  step: '3',
                  title: 'Visualize Data',
                  description: 'Choose chart types and explore your data in 2D and 3D',
                  icon: TrendingUp,
                  color: 'from-green-500 to-emerald-600'
                }
              ].map(({ step, title, description, icon: Icon, color }) => (
                <div key={step} className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                }`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-2`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${theme.text.secondary} leading-relaxed`}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UploadPage;