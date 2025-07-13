import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Download, BarChart3, LineChart, ScatterChart as ScatterIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart2DRenderer = ({ 
  data = [], 
  xAxis, 
  yAxis, 
  chartType = 'line',
  fileName = 'Chart',
  darkMode = false,
  className = ''
}) => {
  const chartRef = useRef(null);

  const theme = {
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!data || !xAxis || !yAxis || data.length === 0) {
      return null;
    }

    const labels = data.map(item => item[xAxis]?.toString() || '');
    const values = data.map(item => {
      const value = parseFloat(item[yAxis]);
      return isNaN(value) ? 0 : value;
    });

    const gradientColors = [
      'rgba(59, 130, 246, 0.8)',   // Blue
      'rgba(147, 51, 234, 0.8)',   // Purple
      'rgba(236, 72, 153, 0.8)',   // Pink
      'rgba(34, 197, 94, 0.8)',    // Green
      'rgba(251, 146, 60, 0.8)',   // Orange
    ];

    const borderColors = [
      'rgb(59, 130, 246)',
      'rgb(147, 51, 234)',
      'rgb(236, 72, 153)',
      'rgb(34, 197, 94)',
      'rgb(251, 146, 60)',
    ];

    if (chartType === 'scatter') {
      return {
        datasets: [{
          label: `${yAxis} vs ${xAxis}`,
          data: data.map(item => ({
            x: parseFloat(item[xAxis]) || 0,
            y: parseFloat(item[yAxis]) || 0
          })),
          backgroundColor: gradientColors[0],
          borderColor: borderColors[0],
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }]
      };
    }

    return {
      labels,
      datasets: [{
        label: yAxis,
        data: values,
        backgroundColor: chartType === 'line' 
          ? `linear-gradient(180deg, ${gradientColors[0]}, rgba(59, 130, 246, 0.1))`
          : gradientColors,
        borderColor: borderColors[0],
        borderWidth: 3,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointBackgroundColor: borderColors[0],
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'line' ? 6 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : 0,
      }]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#e2e8f0' : '#475569',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#e2e8f0' : '#1e293b',
        bodyColor: darkMode ? '#cbd5e1' : '#475569',
        borderColor: darkMode ? '#475569' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context) => {
            if (chartType === 'scatter') {
              return `Point ${context[0].dataIndex + 1}`;
            }
            return context[0].label;
          },
          label: (context) => {
            if (chartType === 'scatter') {
              return [
                `${xAxis}: ${context.parsed.x}`,
                `${yAxis}: ${context.parsed.y}`
              ];
            }
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: chartType === 'scatter' ? 'linear' : 'category',
        title: {
          display: true,
          text: xAxis,
          color: darkMode ? '#e2e8f0' : '#475569',
          font: {
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.8)',
          lineWidth: 1
        },
        ticks: {
          color: darkMode ? '#cbd5e1' : '#64748b',
          font: {
            size: 11
          },
          maxTicksLimit: 10
        }
      },
      y: {
        title: {
          display: true,
          text: yAxis,
          color: darkMode ? '#e2e8f0' : '#475569',
          font: {
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.8)',
          lineWidth: 1
        },
        ticks: {
          color: darkMode ? '#cbd5e1' : '#64748b',
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  // Download chart as PNG
  const downloadChart = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${fileName}_${chartType}_chart.png`;
      link.href = url;
      link.click();
    }
  };

  const chartData = prepareChartData();

  if (!chartData) {
    return (
      <div className={`${theme.card} border rounded-2xl p-8 shadow-lg ${className}`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center mx-auto mb-4`}>
            <BarChart3 className={`w-8 h-8 ${theme.text.secondary}`} />
          </div>
          <h3 className={`text-lg font-semibold ${theme.text.primary} mb-2`}>
            No Chart Data
          </h3>
          <p className={`${theme.text.secondary}`}>
            Please upload a file and select axes to generate a chart
          </p>
        </div>
      </div>
    );
  }

  const ChartComponent = chartType === 'line' ? Line : chartType === 'bar' ? Bar : Scatter;
  const chartIcon = chartType === 'line' ? LineChart : chartType === 'bar' ? BarChart3 : ScatterIcon;
  const ChartIcon = chartIcon;

  return (
    <div className={`${theme.card} border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <ChartIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme.text.primary} capitalize`}>
              {chartType} Chart
            </h3>
            <p className={`text-sm ${theme.text.secondary}`}>
              {fileName} • {data.length} data points
            </p>
          </div>
        </div>
        
        <button
          onClick={downloadChart}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-96 relative">
          <ChartComponent
            ref={chartRef}
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>

      {/* Footer Stats */}
      <div className={`px-6 pb-6 grid grid-cols-3 gap-4`}>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>Data Points</p>
          <p className={`text-lg font-semibold ${theme.text.primary}`}>{data.length}</p>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>X-Axis</p>
          <p className={`text-lg font-semibold ${theme.text.primary} truncate`}>{xAxis}</p>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>Y-Axis</p>
          <p className={`text-lg font-semibold ${theme.text.primary} truncate`}>{yAxis}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart2DRenderer;