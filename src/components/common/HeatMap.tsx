import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle,  Filter } from 'lucide-react';

interface HeatMapProps {
  data?: Array<{
    id: string;
    area: string;
    coordinates: [number, number];
    status: 'clean' | 'moderate' | 'critical';
    complaints: number;
    lastCleaned: string;
    score: number;
  }>;
}

const HeatMap: React.FC<HeatMapProps> = ({ data = [] }) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'clean' | 'moderate' | 'critical'>('all');

  // Mock data if none provided
  const mockData = [
    { id: '1', area: 'Zone A - Sector 1', coordinates: [20, 30] as [number, number], status: 'clean' as const, complaints: 2, lastCleaned: '2024-01-15', score: 9.2 },
    { id: '2', area: 'Zone A - Sector 2', coordinates: [25, 35] as [number, number], status: 'moderate' as const, complaints: 8, lastCleaned: '2024-01-14', score: 7.5 },
    { id: '3', area: 'Zone B - Sector 1', coordinates: [30, 25] as [number, number], status: 'critical' as const, complaints: 15, lastCleaned: '2024-01-12', score: 4.2 },
    { id: '4', area: 'Zone B - Sector 2', coordinates: [35, 40] as [number, number], status: 'clean' as const, complaints: 1, lastCleaned: '2024-01-15', score: 9.8 },
    { id: '5', area: 'Zone C - Sector 1', coordinates: [40, 20] as [number, number], status: 'moderate' as const, complaints: 6, lastCleaned: '2024-01-13', score: 6.8 },
    { id: '6', area: 'Zone C - Sector 2', coordinates: [45, 45] as [number, number], status: 'clean' as const, complaints: 3, lastCleaned: '2024-01-15', score: 8.9 },
  ];

  const mapData = data.length > 0 ? data : mockData;
  const filteredData = filter === 'all' ? mapData : mapData.filter(item => item.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return '#10B981'; // green
      case 'moderate': return '#F59E0B'; // yellow
      case 'critical': return '#EF4444'; // red
      default: return '#6B7280'; // gray
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };


  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Cleanliness Heat Map</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as never)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Areas</option>
              <option value="clean">Clean Zones</option>
              <option value="moderate">Moderate Issues</option>
              <option value="critical">Critical Zones</option>
            </select>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Clean Zone (8.0+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Moderate Issues (5.0-7.9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Critical Zone (&lt;5.0)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-96 overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 400 300">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Mock roads */}
                  <path d="M0,150 Q200,100 400,150" stroke="#d1d5db" strokeWidth="3" fill="none" />
                  <path d="M200,0 Q150,150 200,300" stroke="#d1d5db" strokeWidth="3" fill="none" />
                </svg>
              </div>

              {/* Area Markers */}
              {filteredData.map((area) => (
                <div
                  key={area.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    left: `${(area.coordinates[0] / 50) * 100}%`,
                    top: `${(area.coordinates[1] / 50) * 100}%`,
                  }}
                  onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: getStatusColor(area.status) }}
                  >
                    {getStatusIcon(area.status)}
                  </div>
                  
                  {/* Tooltip */}
                  {selectedArea === area.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-48 z-10">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900 mb-1">{area.area}</p>
                        <p className="text-gray-600 mb-1">Score: <span className="font-medium">{area.score}/10</span></p>
                        <p className="text-gray-600 mb-1">Complaints: <span className="font-medium">{area.complaints}</span></p>
                        <p className="text-gray-600">Last cleaned: <span className="font-medium">{area.lastCleaned}</span></p>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area Details */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Area Statistics</h4>
            <div className="space-y-4">
              {mapData.map((area) => (
                <div 
                  key={area.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedArea === area.id 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">{area.area}</span>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(area.status) }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Score: {area.score}/10</span>
                    <span>{area.complaints} complaints</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(area.score / 10) * 100}%`,
                          backgroundColor: getStatusColor(area.status)
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Overall Metrics</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Score</span>
                <span className="font-semibold text-green-600">7.6/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Clean Zones</span>
                <span className="font-semibold text-green-600">
                  {mapData.filter(a => a.status === 'clean').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Critical Zones</span>
                <span className="font-semibold text-red-600">
                  {mapData.filter(a => a.status === 'critical').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Complaints</span>
                <span className="font-semibold text-orange-600">
                  {mapData.reduce((sum, a) => sum + a.complaints, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;