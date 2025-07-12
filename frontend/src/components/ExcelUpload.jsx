import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Sparkles,
  FileX,
  Download,
  Eye,
  Zap,
  Trash2,
  RefreshCw,
  Clock,
  TrendingUp
} from 'lucide-react';

const ExcelUpload = ({ 
  onUploadSuccess, 
  onUploadError,
  className = '',
  darkMode = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [globalStatus, setGlobalStatus] = useState({ type: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Validate Excel file types with enhanced checking
  const isValidExcelFile = (file) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const validExtensions = ['xls', 'xlsx'];
    
    return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
  };

  // Format file size with precision and units
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Generate unique ID with timestamp and random string
  const generateId = () => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Get file type icon with animation
  const getFileIcon = (fileName, status) => {
    const extension = fileName.toLowerCase().split('.').pop();
    const iconClass = `w-8 h-8 transition-all duration-300 ${
      status === 'success' ? 'text-green-500 animate-pulse' :
      status === 'error' ? 'text-red-500 animate-bounce' :
      status === 'uploading' ? 'text-blue-500 animate-spin' :
      'text-gray-500'
    }`;
    
    return <FileSpreadsheet className={iconClass} />;
  };

  // Handle file selection with advanced validation and preview
  const handleFileSelect = useCallback((selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      // Validation checks
      if (!isValidExcelFile(file)) {
        errors.push(`${file.name} is not a valid Excel file (.xls/.xlsx)`);
        return;
      }

      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        errors.push(`${file.name} exceeds 100MB size limit`);
        return;
      }

      if (file.size === 0) {
        errors.push(`${file.name} is empty`);
        return;
      }

      // Check for duplicates
      const isDuplicate = files.some(f => 
        f.file.name === file.name && 
        f.file.size === file.size && 
        f.file.lastModified === file.lastModified
      );
      
      if (isDuplicate) {
        errors.push(`${file.name} is already selected`);
        return;
      }

      // Create file object with metadata
      validFiles.push({
        file,
        id: generateId(),
        status: 'pending',
        progress: 0,
        uploadedAt: null,
        preview: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          extension: file.name.toLowerCase().split('.').pop()
        }
      });
    });

    // Handle errors
    if (errors.length > 0) {
      setGlobalStatus({
        type: 'error',
        message: errors.join('; ')
      });
      setTimeout(() => setGlobalStatus({ type: '', message: '' }), 6000);
    }

    // Add valid files
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setGlobalStatus({ 
        type: 'success', 
        message: `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} added successfully` 
      });
      setTimeout(() => setGlobalStatus({ type: '', message: '' }), 3000);
    }
  }, [files]);

  // Enhanced drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  // Handle input change
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  // Simulate realistic upload process
  const simulateUpload = async (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    const updateProgress = (progress, status = 'uploading') => {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress, status } : f
      ));
    };

    // Simulate upload phases
    const phases = [
      { name: 'Preparing', duration: 500, progress: 10 },
      { name: 'Uploading', duration: 2000, progress: 70 },
      { name: 'Processing', duration: 800, progress: 90 },
      { name: 'Finalizing', duration: 300, progress: 100 }
    ];

    for (const phase of phases) {
      await new Promise(resolve => {
        const interval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { 
              ...f, 
              progress: Math.min(f.progress + Math.random() * 5, phase.progress),
              status: 'uploading'
            } : f
          ));
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          updateProgress(phase.progress);
          resolve();
        }, phase.duration);
      });
    }

    // Simulate success/failure (95% success rate)
    const isSuccess = Math.random() > 0.05;
    
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { 
            ...f, 
            progress: 100, 
            status: isSuccess ? 'success' : 'error',
            uploadedAt: isSuccess ? new Date().toISOString() : null,
            preview: isSuccess ? {
              ...f.preview,
              rows: Math.floor(Math.random() * 5000) + 100,
              columns: Math.floor(Math.random() * 50) + 5,
              sheets: Math.floor(Math.random() * 5) + 1
            } : f.preview
          } 
        : f
    ));

    if (isSuccess && onUploadSuccess) {
      onUploadSuccess({ 
        fileId, 
        fileName: file.file.name,
        message: 'Upload completed successfully' 
      });
    } else if (!isSuccess && onUploadError) {
      onUploadError(new Error(`Failed to upload ${file.file.name}`));
    }
  };

  // Upload single file
  const uploadFile = (fileId) => {
    simulateUpload(fileId);
  };

  // Upload all pending files
  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    setIsProcessing(true);
    
    // Upload files in batches of 3 for better performance
    const batchSize = 3;
    for (let i = 0; i < pendingFiles.length; i += batchSize) {
      const batch = pendingFiles.slice(i, i + batchSize);
      await Promise.all(batch.map(f => simulateUpload(f.id)));
    }
    
    setIsProcessing(false);
  };

  // Remove file with animation
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Clear all files
  const clearAllFiles = () => {
    setFiles([]);
    setGlobalStatus({ type: '', message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Retry failed uploads
  const retryFailedUploads = () => {
    const failedFiles = files.filter(f => f.status === 'error');
    failedFiles.forEach(f => {
      setFiles(prev => prev.map(file => 
        file.id === f.id ? { ...file, status: 'pending', progress: 0 } : file
      ));
    });
  };

  // Theme configuration
  const theme = {
    background: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardHover: darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50',
    text: {
      primary: darkMode ? 'text-white' : 'text-gray-900',
      secondary: darkMode ? 'text-gray-300' : 'text-gray-600',
      muted: darkMode ? 'text-gray-400' : 'text-gray-500'
    },
    dropzone: {
      default: darkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-gray-50/50 border-gray-300',
      active: darkMode ? 'bg-blue-900/30 border-blue-400' : 'bg-blue-50/80 border-blue-400'
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
      secondary: darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
    }
  };

  // Statistics
  const stats = {
    pending: files.filter(f => f.status === 'pending').length,
    uploading: files.filter(f => f.status === 'uploading').length,
    success: files.filter(f => f.status === 'success').length,
    error: files.filter(f => f.status === 'error').length,
    total: files.length
  };

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Advanced Statistics Dashboard */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { 
              label: 'Total Files', 
              count: stats.total, 
              color: 'indigo', 
              icon: FileSpreadsheet,
              gradient: 'from-indigo-500 to-purple-600'
            },
            { 
              label: 'Pending', 
              count: stats.pending, 
              color: 'blue', 
              icon: Clock,
              gradient: 'from-blue-500 to-cyan-600'
            },
            { 
              label: 'Uploading', 
              count: stats.uploading, 
              color: 'yellow', 
              icon: Zap,
              gradient: 'from-yellow-500 to-orange-600'
            },
            { 
              label: 'Completed', 
              count: stats.success, 
              color: 'green', 
              icon: CheckCircle2,
              gradient: 'from-green-500 to-emerald-600'
            },
            { 
              label: 'Failed', 
              count: stats.error, 
              color: 'red', 
              icon: AlertTriangle,
              gradient: 'from-red-500 to-pink-600'
            }
          ].map(({ label, count, color, icon: Icon, gradient }) => (
            <div key={label} className={`${theme.card} border rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 group`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${theme.text.primary} group-hover:scale-110 transition-transform duration-300`}>
                    {count}
                  </p>
                  <p className={`text-sm ${theme.text.secondary}`}>{label}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Upload Zone with Advanced Design */}
      <div
        ref={dropZoneRef}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-500 ease-out transform overflow-hidden ${
          dragActive 
            ? `${theme.dropzone.active} shadow-2xl shadow-blue-500/25 scale-[1.02] rotate-1` 
            : `${theme.dropzone.default} hover:border-blue-400 hover:shadow-xl hover:scale-[1.01]`
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Floating Particles */}
          <div className={`absolute inset-0 opacity-10 ${dragActive ? 'animate-pulse' : ''}`}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-float`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 ${dragActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleInputChange}
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="relative z-20 p-12 text-center">
          {/* Upload Icon with Advanced Animation */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-500 transform ${
              dragActive 
                ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white scale-110 rotate-12 shadow-2xl' 
                : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} hover:bg-gradient-to-br hover:from-blue-500 hover:via-purple-600 hover:to-pink-500 hover:text-white hover:scale-105 hover:shadow-xl`
            }`}>
              <Upload className={`w-16 h-16 transition-transform duration-500 ${dragActive ? 'animate-bounce' : ''}`} />
            </div>
            
            {/* Floating Elements */}
            <Sparkles className={`absolute -top-4 -right-4 w-8 h-8 text-yellow-400 transition-all duration-300 ${dragActive ? 'animate-spin' : 'animate-pulse'}`} />
            <Sparkles className={`absolute -bottom-2 -left-2 w-6 h-6 text-blue-400 transition-all duration-300 ${dragActive ? 'animate-ping' : 'animate-pulse delay-100'}`} />
            <FileSpreadsheet className={`absolute top-2 left-2 w-6 h-6 text-green-400 transition-all duration-300 ${dragActive ? 'animate-bounce delay-200' : 'animate-pulse delay-200'}`} />
          </div>

          {/* Dynamic Upload Text */}
          <h3 className={`text-3xl font-bold mb-4 ${theme.text.primary} transition-all duration-300`}>
            {dragActive ? (
              <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Drop your Excel files here!
              </span>
            ) : (
              'Upload Excel Files'
            )}
          </h3>
          
          <p className={`text-lg mb-8 ${theme.text.secondary} max-w-2xl mx-auto leading-relaxed`}>
            {dragActive ? (
              'Release to add your files to the upload queue'
            ) : (
              'Drag and drop your .xls or .xlsx files here, or click to browse. Multiple files supported with advanced validation and progress tracking.'
            )}
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: FileSpreadsheet, text: 'Excel Files Only', color: 'text-green-500' },
              { icon: TrendingUp, text: 'Real-time Progress', color: 'text-blue-500' },
              { icon: CheckCircle2, text: 'Batch Processing', color: 'text-purple-500' }
            ].map(({ icon: Icon, text, color }, index) => (
              <div key={index} className={`flex items-center justify-center space-x-2 p-3 rounded-xl ${theme.card} border transition-all duration-300 hover:scale-105`}>
                <Icon className={`w-5 h-5 ${color}`} />
                <span className={`text-sm font-medium ${theme.text.secondary}`}>{text}</span>
              </div>
            ))}
          </div>

          {/* Browse Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`px-8 py-4 ${theme.button.primary} text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
          >
            Browse Files
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {stats.pending > 0 && (
            <button
              onClick={uploadAllFiles}
              disabled={isProcessing}
              className={`px-6 py-3 ${theme.button.primary} text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
            >
              {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              <span>Upload All ({stats.pending})</span>
            </button>
          )}
          
          {stats.error > 0 && (
            <button
              onClick={retryFailedUploads}
              className={`px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retry Failed ({stats.error})</span>
            </button>
          )}
          
          <button
            onClick={clearAllFiles}
            className={`px-6 py-3 ${theme.button.danger} text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Advanced File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className={`text-xl font-semibold ${theme.text.primary} flex items-center space-x-2`}>
            <FileSpreadsheet className="w-6 h-6" />
            <span>File Queue ({files.length})</span>
          </h4>
          
          <div className="grid gap-4">
            {files.map((fileObj) => (
              <div
                key={fileObj.id}
                className={`${theme.card} border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getFileIcon(fileObj.file.name, fileObj.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className={`font-semibold ${theme.text.primary} truncate group-hover:text-blue-500 transition-colors duration-300`}>
                        {fileObj.file.name}
                      </h5>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-sm ${theme.text.muted}`}>
                          {formatFileSize(fileObj.file.size)}
                        </span>
                        <span className={`text-sm ${theme.text.muted}`}>
                          {fileObj.preview.extension.toUpperCase()}
                        </span>
                        <span className={`text-sm ${theme.text.muted}`}>
                          Modified: {fileObj.preview.lastModified}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    fileObj.status === 'success' ? 'bg-green-100 text-green-800' :
                    fileObj.status === 'error' ? 'bg-red-100 text-red-800' :
                    fileObj.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {fileObj.status === 'success' ? 'Completed' :
                     fileObj.status === 'error' ? 'Failed' :
                     fileObj.status === 'uploading' ? 'Uploading' :
                     'Pending'}
                  </div>
                </div>

                {/* Progress Bar */}
                {fileObj.status === 'uploading' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${theme.text.secondary}`}>
                        Uploading...
                      </span>
                      <span className={`text-sm font-medium ${theme.text.primary}`}>
                        {Math.round(fileObj.progress)}%
                      </span>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${darkMode ? 'bg-gray-600' : ''}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                        style={{ width: `${fileObj.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Preview */}
                {fileObj.status === 'success' && fileObj.preview.rows && (
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
                    <h6 className={`font-medium ${theme.text.primary} mb-2 flex items-center space-x-2`}>
                      <Eye className="w-4 h-4" />
                      <span>File Preview</span>
                    </h6>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className={theme.text.muted}>Rows:</span>
                        <span className={`ml-2 font-medium ${theme.text.primary}`}>
                          {fileObj.preview.rows.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className={theme.text.muted}>Columns:</span>
                        <span className={`ml-2 font-medium ${theme.text.primary}`}>
                          {fileObj.preview.columns}
                        </span>
                      </div>
                      <div>
                        <span className={theme.text.muted}>Sheets:</span>
                        <span className={`ml-2 font-medium ${theme.text.primary}`}>
                          {fileObj.preview.sheets}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {fileObj.status === 'pending' && (
                      <button
                        onClick={() => uploadFile(fileObj.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    )}
                    
                    {fileObj.status === 'error' && (
                      <button
                        onClick={() => uploadFile(fileObj.id)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Retry</span>
                      </button>
                    )}
                    
                    {fileObj.status === 'success' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => removeFile(fileObj.id)}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Status Messages */}
      {globalStatus.message && (
        <div className={`fixed bottom-6 right-6 max-w-md p-4 rounded-2xl shadow-2xl border backdrop-blur-sm transition-all duration-500 transform z-50 ${
          globalStatus.type === 'success' 
            ? 'bg-green-50/90 border-green-200 text-green-800' 
            : globalStatus.type === 'error'
            ? 'bg-red-50/90 border-red-200 text-red-800'
            : 'bg-blue-50/90 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-start space-x-3">
            {globalStatus.type === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : globalStatus.type === 'error' ? (
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (
              <FileSpreadsheet className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm leading-relaxed">
                {globalStatus.message}
              </p>
            </div>
            <button
              onClick={() => setGlobalStatus({ type: '', message: '' })}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom CSS for floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(90deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    75% { transform: translateY(-10px) rotate(270deg); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default ExcelUpload;