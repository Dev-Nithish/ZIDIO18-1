import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Download, Cuboid as Cube, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

// 3D Scatter Plot Component
const ScatterPlot3D = ({ data, xAxis, yAxis, zAxis, darkMode }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);

  // Normalize data for 3D space
  const normalizeData = (data, axis) => {
    const values = data.map(item => parseFloat(item[axis]) || 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return values.map(val => ((val - min) / range) * 10 - 5); // Scale to -5 to 5
  };

  const xValues = normalizeData(data, xAxis);
  const yValues = normalizeData(data, yAxis);
  const zValues = zAxis ? normalizeData(data, zAxis) : data.map(() => 0);

  // Animate rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Data Points */}
      {data.map((item, index) => (
        <mesh
          key={index}
          position={[xValues[index], yValues[index], zValues[index]]}
          onPointerOver={() => setHovered(index)}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={hovered === index ? '#ff6b6b' : '#3b82f6'}
            emissive={hovered === index ? '#ff6b6b' : '#1e40af'}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Axes */}
      {/* X-Axis */}
      <mesh position={[0, -6, 0]}>
        <boxGeometry args={[12, 0.05, 0.05]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Y-Axis */}
      <mesh position={[-6, 0, 0]}>
        <boxGeometry args={[0.05, 12, 0.05]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      
      {/* Z-Axis */}
      <mesh position={[-6, -6, 0]}>
        <boxGeometry args={[0.05, 0.05, 12]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Axis Labels */}
      <Text
        position={[6, -6.5, 0]}
        fontSize={0.5}
        color={darkMode ? '#e2e8f0' : '#1e293b'}
        anchorX="center"
        anchorY="middle"
      >
        {xAxis}
      </Text>
      
      <Text
        position={[-6.5, 6, 0]}
        fontSize={0.5}
        color={darkMode ? '#e2e8f0' : '#1e293b'}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, Math.PI / 2]}
      >
        {yAxis}
      </Text>
      
      {zAxis && (
        <Text
          position={[-6.5, -6, 6]}
          fontSize={0.5}
          color={darkMode ? '#e2e8f0' : '#1e293b'}
          anchorX="center"
          anchorY="middle"
          rotation={[Math.PI / 2, 0, 0]}
        >
          {zAxis}
        </Text>
      )}

      {/* Grid */}
      <gridHelper args={[10, 10, darkMode ? '#475569' : '#cbd5e1', darkMode ? '#334155' : '#e2e8f0']} />
    </group>
  );
};

const Chart3DRenderer = ({ 
  data = [], 
  xAxis, 
  yAxis, 
  zAxis,
  fileName = 'Chart',
  darkMode = false,
  className = ''
}) => {
  const canvasRef = useRef();
  const [isRotating, setIsRotating] = useState(true);

  const theme = {
    card: darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 backdrop-blur-sm border-white/20',
    text: {
      primary: darkMode ? 'text-white' : 'text-slate-900',
      secondary: darkMode ? 'text-slate-300' : 'text-slate-600'
    }
  };

  // Download 3D chart as image
  const download3DChart = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${fileName}_3d_chart.png`;
        link.href = url;
        link.click();
      }
    }
  };

  if (!data || !xAxis || !yAxis || data.length === 0) {
    return (
      <div className={`${theme.card} border rounded-2xl p-8 shadow-lg ${className}`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center mx-auto mb-4`}>
            <Cube className={`w-8 h-8 ${theme.text.secondary}`} />
          </div>
          <h3 className={`text-lg font-semibold ${theme.text.primary} mb-2`}>
            No 3D Chart Data
          </h3>
          <p className={`${theme.text.secondary}`}>
            Please upload a file and select axes to generate a 3D chart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.card} border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Cube className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme.text.primary}`}>
              3D Scatter Plot
            </h3>
            <p className={`text-sm ${theme.text.secondary}`}>
              {fileName} • {data.length} data points
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            title={isRotating ? 'Stop rotation' : 'Start rotation'}
          >
            <RotateCcw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={download3DChart}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="p-6">
        <div 
          ref={canvasRef}
          className="h-96 rounded-xl overflow-hidden"
          style={{ background: darkMode ? '#0f172a' : '#f8fafc' }}
        >
          <Canvas
            camera={{ position: [10, 10, 10], fov: 60 }}
            style={{ background: 'transparent' }}
          >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* 3D Scatter Plot */}
            <ScatterPlot3D 
              data={data} 
              xAxis={xAxis} 
              yAxis={yAxis} 
              zAxis={zAxis}
              darkMode={darkMode}
            />

            {/* Controls */}
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={isRotating}
              autoRotateSpeed={2}
            />
          </Canvas>
        </div>
      </div>

      {/* Footer Stats */}
      <div className={`px-6 pb-6 grid grid-cols-3 gap-4`}>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>X-Axis</p>
          <p className={`text-lg font-semibold ${theme.text.primary} truncate`}>{xAxis}</p>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>Y-Axis</p>
          <p className={`text-lg font-semibold ${theme.text.primary} truncate`}>{yAxis}</p>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-sm ${theme.text.secondary}`}>Z-Axis</p>
          <p className={`text-lg font-semibold ${theme.text.primary} truncate`}>{zAxis || 'None'}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className={`px-6 pb-6 text-center`}>
        <p className={`text-xs ${theme.text.secondary}`}>
          Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  );
};

export default Chart3DRenderer;