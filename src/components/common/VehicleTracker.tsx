import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, Navigation, Fuel, AlertCircle, CheckCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  type: 'compactor' | 'side-loader' | 'front-loader' | 'roll-off';
  driver: string;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  route: string;
  progress: number;
  fuel: number;
  lastUpdate: string;
  nextStop?: string;
  estimatedArrival?: string;
}

interface VehicleTrackerProps {
  vehicles?: Vehicle[];
  showMap?: boolean;
  userRole?: string;
}

const VehicleTracker: React.FC<VehicleTrackerProps> = ({ 
  vehicles = [], 
  showMap = true,
  userRole = 'citizen'
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [liveUpdates, setLiveUpdates] = useState(true);

  // Mock data if none provided
  const mockVehicles: Vehicle[] = [
    {
      id: 'GC-001',
      name: 'Garbage Truck Alpha',
      type: 'compactor',
      driver: 'John Worker',
      status: 'active',
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'MG Road, Sector 15'
      },
      route: 'Route A - Residential',
      progress: 65,
      fuel: 78,
      lastUpdate: '2 minutes ago',
      nextStop: 'Residential Complex B',
      estimatedArrival: '5 minutes'
    },
    {
      id: 'GC-002',
      name: 'Collection Van Beta',
      type: 'side-loader',
      driver: 'Sarah Collector',
      status: 'active',
      location: {
        lat: 19.0896,
        lng: 72.8656,
        address: 'Park Street, Area 12'
      },
      route: 'Route B - Commercial',
      progress: 40,
      fuel: 92,
      lastUpdate: '1 minute ago',
      nextStop: 'Shopping Complex',
      estimatedArrival: '8 minutes'
    },
    {
      id: 'GC-003',
      name: 'Heavy Loader Gamma',
      type: 'front-loader',
      driver: 'Mike Handler',
      status: 'idle',
      location: {
        lat: 19.0728,
        lng: 72.8826,
        address: 'Municipal Depot'
      },
      route: 'Route C - Industrial',
      progress: 100,
      fuel: 45,
      lastUpdate: '5 minutes ago'
    }
  ];

  const vehicleData = vehicles.length > 0 ? vehicles : mockVehicles;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'idle': return <Clock className="w-4 h-4" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getVehicleIcon = (type: string) => {
    return <Truck className="w-6 h-6" />; // Simplified - could have different icons per type
  };

  // Simulate live updates
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      // This would normally update vehicle positions from API
      console.log('Updating vehicle positions...');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [liveUpdates]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Vehicle Tracking</h3>
          <p className="text-gray-600">Real-time location and status of collection vehicles</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${liveUpdates ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {liveUpdates ? 'Live Updates' : 'Updates Paused'}
            </span>
          </div>
          <button
            onClick={() => setLiveUpdates(!liveUpdates)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              liveUpdates 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {liveUpdates ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle List */}
        <div className="lg:col-span-1 space-y-4">
          {vehicleData.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                selectedVehicle === vehicle.id
                  ? 'border-green-300 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getVehicleIcon(vehicle.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vehicle.id}</h4>
                    <p className="text-sm text-gray-600">{vehicle.name}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {getStatusIcon(vehicle.status)}
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vehicle.location.address}</span>
                </div>
                
                {userRole !== 'citizen' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Navigation className="w-4 h-4" />
                    <span>{vehicle.route}</span>
                  </div>
                )}

                {vehicle.status === 'active' && vehicle.nextStop && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span>Next: {vehicle.nextStop} ({vehicle.estimatedArrival})</span>
                  </div>
                )}

                {userRole !== 'citizen' && (
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Fuel: {vehicle.fuel}%</span>
                    </div>
                    <span className="text-xs text-gray-500">Updated {vehicle.lastUpdate}</span>
                  </div>
                )}

                {vehicle.status === 'active' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Route Progress</span>
                      <span>{vehicle.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${vehicle.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {showMap && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Live Map</h4>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-80 overflow-hidden">
                {/* Simulated Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">Real-time vehicle locations</p>
                  </div>
                </div>

                {/* Vehicle Markers */}
                {vehicleData.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className={`p-2 rounded-full shadow-lg ${
                      vehicle.status === 'active' ? 'bg-green-500' : 
                      vehicle.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow">
                      {vehicle.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {(() => {
                const vehicle = vehicleData.find(v => v.id === selectedVehicle);
                if (!vehicle) return null;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{vehicle.name}</h4>
                        <p className="text-gray-600">{vehicle.id} • Driver: {vehicle.driver}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                        {getStatusIcon(vehicle.status)}
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Current Location</h5>
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {vehicle.location.address}
                          </p>
                        </div>

                        {userRole !== 'citizen' && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Route Information</h5>
                            <p className="text-gray-600 flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              {vehicle.route}
                            </p>
                          </div>
                        )}

                        {vehicle.nextStop && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Next Stop</h5>
                            <p className="text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {vehicle.nextStop} • ETA: {vehicle.estimatedArrival}
                            </p>
                          </div>
                        )}
                      </div>

                      {userRole !== 'citizen' && (
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Vehicle Stats</h5>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Fuel Level</span>
                                  <span className="font-medium">{vehicle.fuel}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${vehicle.fuel}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Route Progress</span>
                                  <span className="font-medium">{vehicle.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${vehicle.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Last updated: {vehicle.lastUpdate}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {userRole === 'citizen' && vehicle.status === 'active' && vehicle.estimatedArrival && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Truck className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-900">Vehicle Approaching!</p>
                            <p className="text-sm text-green-700">
                              {vehicle.id} will arrive at your area in approximately {vehicle.estimatedArrival}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleTracker;