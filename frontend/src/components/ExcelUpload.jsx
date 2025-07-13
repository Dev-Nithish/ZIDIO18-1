import React, { useState, useRef, useCallback } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Loader2
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const ExcelUpload = ({ onFileUpload, darkMode = false, className = '' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);

  const isValidExcelFile = (file) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const validExtensions = ['xls', 'xlsx', 'csv'];
    return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const parseCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV file'));
          } else {
            resolve({
              data: results.data,
              headers: Object.keys(results.data[0] || {}),
              fileName: file.name
            });
          }
        },
        error: (error) => reject(error)
      });
    });
  };

  const handleFileSelect = useCallback(async (file) => {
    if (!isValidExcelFile(file)) {
      setStatus({ type: 'error', message: 'Please select a valid Excel file (.xls, .xlsx, or .csv)' });
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File size must be less than 50MB' });
      return;
    }

    setSelectedFile(file);
    setStatus({ type: '', message: '' });
    setUploading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (file.name.toLowerCase().endsWith('.csv')) {
        const parsedData = await parseCSVFile(file);
        setStatus({
          type: 'success',
          message: `File uploaded successfully! Found ${parsedData.data.length} rows and ${parsedData.headers.length} columns.`
        });
        onFileUpload && onFileUpload(parsedData);
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        const headers = Object.keys(jsonData[0] || {});
        const parsedExcel = {
          data: jsonData,
          headers,
          fileName: file.name
        };
        setStatus({
          type: 'success',
          message: `File uploaded successfully! Found ${jsonData.length} rows and ${headers.length} columns.`
        });
        onFileUpload && onFileUpload(parsedExcel);
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to upload file. Please try again.' });
    } finally {
      setUploading(false);
    }
  }, [onFileUpload]);

  const handleDrag = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);
  const handleDragIn = useCallback((e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.items.length > 0) setDragActive(true); }, []);
  const handleDragOut = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
  }, [handleFileSelect]);

  const handleInputChange = (e) => {
    if (e.target.files[0]) handleFileSelect(e.target.files[0]);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setStatus({ type: '', message: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative rounded-3xl border-2 border-dashed p-12 text-center ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50'}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading}
        />
        {!selectedFile ? (
          <>
            <Upload className="w-12 h-12 mx-auto text-slate-500" />
            <p className="mt-4 text-lg font-semibold text-slate-700">{dragActive ? 'Drop your Excel file here' : 'Upload Excel File'}</p>
            <p className="text-sm text-slate-500">.xls, .xlsx, or .csv</p>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <FileSpreadsheet className="w-10 h-10 text-green-500 mb-2" />
              <p className="text-sm text-slate-700 font-medium">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
              {!uploading && <button onClick={clearSelection} className="mt-2 text-xs text-red-500 hover:underline">Clear</button>}
              {uploading && <Loader2 className="w-5 h-5 mt-2 animate-spin text-blue-500" />}
            </div>
          </>
        )}
      </div>
      {status.message && (
        <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;