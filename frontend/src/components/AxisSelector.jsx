import React from 'react';
import { ChevronDown } from 'lucide-react';

const AxisSelector = ({ 
  headers = [], 
  xAxis, 
  yAxis, 
  zAxis, 
  onXAxisChange, 
  onYAxisChange, 
  onZAxisChange,
  darkMode = false,
  show3D = false,
  className = ''
}) => {
  const theme = {
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    select: darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  const CustomSelect = ({ label, value, onChange, options, required = true }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${theme.text.primary}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 pr-10 rounded-xl border transition-all duration-300 ${theme.select} focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none appearance-none cursor-pointer hover:border-blue-400`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
        <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.text.secondary} pointer-events-none`} />
      </div>
    </div>
  );

  if (headers.length === 0) {
    return null;
  }

  return (
    <div className={`${theme.card} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4 flex items-center space-x-2`}>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>Axis Configuration</span>
      </h3>
      
      <div className={`grid gap-4 ${show3D ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        <CustomSelect
          label="X-Axis"
          value={xAxis}
          onChange={onXAxisChange}
          options={headers}
        />
        
        <CustomSelect
          label="Y-Axis"
          value={yAxis}
          onChange={onYAxisChange}
          options={headers}
        />
        
        {show3D && (
          <CustomSelect
            label="Z-Axis"
            value={zAxis}
            onChange={onZAxisChange}
            options={headers}
            required={false}
          />
        )}
      </div>
      
      {(!xAxis || !yAxis) && (
        <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-amber-900/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'} border`}>
          <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
            Please select both X and Y axes to generate charts
          </p>
        </div>
      )}
    </div>
  );
};

export default AxisSelector;