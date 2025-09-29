import React, { useState } from 'react';
import {
  ClipboardList,
  Camera,
  MapPin,
  Award,
  GraduationCap,
  Truck,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  Mic,
  CreditCard,
  AlertTriangle,
  Star,
  Target,
  Zap,
  QrCode,
  Globe,
  Package,
  Calendar,
  UserCheck,
  MessageSquare,
} from 'lucide-react';

import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';
import VehicleTracker from '../common/VehicleTracker';

interface WorkerDashboardProps {
  user: User;
  onLogout: () => void;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const sidebarItems = [
    { icon: <ClipboardList className="w-5 h-5" />, label: 'My Tasks', active: activeTab === 'tasks', onClick: () => setActiveTab('tasks') },
    { icon: <Camera className="w-5 h-5" />, label: 'Submit Proof', active: activeTab === 'proof', onClick: () => setActiveTab('proof') },
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Attendance', active: activeTab === 'attendance', onClick: () => setActiveTab('attendance') },
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Tracking', active: activeTab === 'tracking', onClick: () => setActiveTab('tracking') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Route Map', active: activeTab === 'routes', onClick: () => setActiveTab('routes') },
    { icon: <Package className="w-5 h-5" />, label: 'Uber for Garbage', active: activeTab === 'uber', onClick: () => setActiveTab('uber') },
    { icon: <Award className="w-5 h-5" />, label: 'Incentives', active: activeTab === 'incentives', onClick: () => setActiveTab('incentives') },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Penalties', active: activeTab === 'penalties', onClick: () => setActiveTab('penalties') },
    { icon: <Globe className="w-5 h-5" />, label: 'Multilingual', active: activeTab === 'language', onClick: () => setActiveTab('language') },
    { icon: <QrCode className="w-5 h-5" />, label: 'Digital ID', active: activeTab === 'digitalid', onClick: () => setActiveTab('digitalid') },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <Users className="w-5 h-5" />, label: 'Community', active: activeTab === 'community', onClick: () => setActiveTab('community') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h2>
              <p className="text-gray-600">Today's assigned tasks and progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Tasks Today"
                value="6"
                icon={<ClipboardList className="w-6 h-6" />}
                color="blue"
              />
              <StatCard
                title="Completed"
                value="4"
                icon={<CheckCircle className="w-6 h-6" />}
                color="green"
              />
              <StatCard
                title="In Progress"
                value="1"
                icon={<Clock className="w-6 h-6" />}
                color="yellow"
              />
              <StatCard
                title="Performance"
                value="92%"
                icon={<BarChart3 className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="purple"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 'T001',
                      location: 'MG Road - Bin #45',
                      type: 'Overflowing Bin',
                      priority: 'High',
                      status: 'Completed',
                      time: '09:30 AM'
                    },
                    {
                      id: 'T002',
                      location: 'Park Street - Area 12',
                      type: 'Illegal Dumping',
                      priority: 'Medium',
                      status: 'Completed',
                      time: '11:15 AM'
                    },
                    {
                      id: 'T003',
                      location: 'Main Square - Bin #78',
                      type: 'Missed Collection',
                      priority: 'High',
                      status: 'In Progress',
                      time: '02:00 PM'
                    },
                    {
                      id: 'T004',
                      location: 'City Center - Area 5',
                      type: 'Cleaning Required',
                      priority: 'Low',
                      status: 'Pending',
                      time: '03:30 PM'
                    }
                  ].map((task, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{task.id}</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                            }`}>
                            {task.priority}
                          </span>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${task.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-gray-900">{task.type}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {task.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Scheduled: {task.time}</span>
                        {task.status === 'Pending' && (
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                            Start Task
                          </button>
                        )}
                        {task.status === 'In Progress' && (
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                            Submit Proof
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'proof':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Proof of Work</h2>
              <p className="text-gray-600">Upload geo-tagged photos to verify task completion</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Task: Main Square - Bin #78</h3>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Take Photo</h4>
                  <p className="text-gray-600 mb-4">Capture a geo-tagged photo of the completed work</p>
                  <div className="flex gap-3 justify-center">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                      Open Camera
                    </button>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <Mic className="w-5 h-5" />
                      Voice Note
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Photo Requirements</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Clear view of the work area</li>
                      <li>• GPS location must be enabled</li>
                      <li>• Photo must be taken at the task location</li>
                      <li>• Include before/after if applicable</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Task Details</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Type:</strong> Missed Collection</p>
                      <p><strong>Priority:</strong> High</p>
                      <p><strong>Location:</strong> Main Square - Bin #78</p>
                      <p><strong>Assigned:</strong> 02:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Save as Draft
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                    Submit Completion
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'training':
        return <TrainingSystem user={user} />;

      case 'routes':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Route Map</h2>
              <p className="text-gray-600">
                Visualize collection routes, assigned workers, and daily coverage
              </p>
            </div>

            {/* Route Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Routes"
                value="36"
                icon={<MapPin className="w-6 h-6" />}
                trend={{ value: "3", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active Today"
                value="28"
                icon={<Truck className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Completed"
                value="19"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "5", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Pending"
                value="9"
                icon={<Clock className="w-6 h-6" />}
                trend={{ value: "1", isPositive: false }}
                color="yellow"
              />
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Route Map</h3>
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-500">
                {/* Replace this with your actual map component (Leaflet, Google Maps, Mapbox, etc.) */}
                Map view goes here
              </div>
            </div>

            {/* Route List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Routes Overview</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Area Covered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Worker
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: 'R001',
                        area: 'Ward 12 – Market Road',
                        worker: 'John Worker',
                        status: 'In Progress',
                        updated: '09:45 AM',
                      },
                      {
                        id: 'R002',
                        area: 'Ward 8 – Green Park',
                        worker: 'Sarah Worker',
                        status: 'Completed',
                        updated: '08:20 AM',
                      },
                      {
                        id: 'R003',
                        area: 'Zone C – Industrial Layout',
                        worker: 'Mike Worker',
                        status: 'Pending',
                        updated: '—',
                      },
                    ].map((route, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {route.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{route.area}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{route.worker}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${route.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : route.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {route.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{route.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );



      case 'tracking':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking</h2>
              <p className="text-gray-600">Track your assigned vehicle and optimize routes</p>
            </div>
            <VehicleTracker userRole="worker" />
          </div>
        );

      case 'uber':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Uber for Garbage</h2>
              <p className="text-gray-600">Handle on-demand waste collection requests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Assigned Requests"
                value="5"
                icon={<Package className="w-6 h-6" />}
                color="blue"
              />
              <StatCard
                title="Completed Today"
                value="12"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "3", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Average Time"
                value="28 min"
                icon={<Clock className="w-6 h-6" />}
                trend={{ value: "5 min", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Rating"
                value="4.8/5"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "0.1", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Current Requests</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 'UG001',
                      customer: 'Priya Sharma',
                      location: 'MG Road, Apt 5B',
                      type: 'Bulk Waste',
                      priority: 'High',
                      distance: '2.3 km',
                      estimatedTime: '15 min'
                    },
                    {
                      id: 'UG002',
                      customer: 'Rajesh Kumar',
                      location: 'Park Street, House 12',
                      type: 'E-Waste',
                      priority: 'Medium',
                      distance: '1.8 km',
                      estimatedTime: '12 min'
                    }
                  ].map((request, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{request.id}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${request.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {request.priority}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{request.customer}</h4>
                          <p className="text-sm text-gray-600 mb-1">{request.type}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {request.location}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{request.distance}</p>
                          <p>{request.estimatedTime}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                          Accept
                        </button>
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                          Navigate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'digitalid':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Digital ID Card</h2>
              <p className="text-gray-600">Your unique digital identification</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-green-100">Waste Management Worker</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-green-100">Worker ID:</span>
                    <span className="font-semibold">W{user.id.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Department:</span>
                    <span className="font-semibold">Zone A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Valid Until:</span>
                    <span className="font-semibold">Dec 2024</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center mb-2">
                    <QrCode className="w-16 h-16 text-gray-800" />
                  </div>
                  <p className="text-xs text-green-100">Scan for verification</p>
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ID Card Features</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unique QR code for instant verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Digital signature and security features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Works offline for field verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Linked to attendance and performance data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Language Settings</h2>
              <p className="text-gray-600">Choose your preferred language for the app</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Languages</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', selected: true },
                    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', selected: false },
                    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', selected: false },
                    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', selected: false },
                    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', selected: false },
                    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', selected: false }
                  ].map((language, index) => (
                    <button
                      key={index}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${language.selected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <p className="font-medium text-gray-900">{language.name}</p>
                          <p className="text-sm text-gray-600">{language.native}</p>
                        </div>
                        {language.selected && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Voice-to-Text Support</h4>
                      <p className="text-sm text-blue-800">
                        Voice commands and dictation are available in Hindi and Marathi for easier task reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'penalties':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Penalties</h2>
              <p className="text-gray-600">View your penalty history and current status</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Penalties"
                value="2"
                icon={<AlertTriangle className="w-6 h-6" />}
                trend={{ value: "0", isPositive: false }}   // added
                color="red"
              />
              <StatCard
                title="This Month"
                value="0"
                icon={<Calendar className="w-6 h-6" />}
                trend={{ value: "-1", isPositive: true }}   // added
                color="green"
              />
              <StatCard
                title="Amount Owed"
                value="₹0"
                icon={<CreditCard className="w-6 h-6" />}
                trend={{ value: "-₹800", isPositive: true }} // added
                color="green"
              />
              <StatCard
                title="Performance Score"
                value="92%"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="blue"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Penalty History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 'P001',
                      type: 'Late Arrival',
                      date: '2024-01-10',
                      amount: '₹300',
                      status: 'Paid',
                      description: 'Arrived 30 minutes late for shift'
                    },
                    {
                      id: 'P002',
                      type: 'Missed Collection',
                      date: '2024-01-05',
                      amount: '₹500',
                      status: 'Paid',
                      description: 'Failed to collect from 3 scheduled stops'
                    }
                  ].map((penalty, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{penalty.id}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${penalty.status === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}>
                              {penalty.status}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{penalty.type}</h4>
                          <p className="text-sm text-gray-600">{penalty.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">{penalty.amount}</p>
                          <p className="text-sm text-gray-500">{penalty.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">Great Performance!</h4>
                      <p className="text-sm text-green-800">
                        You have no pending penalties. Keep up the excellent work!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Attendance & Check-in</h2>
              <p className="text-gray-600">Manage your daily attendance with facial recognition</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Days Present"
                value="22"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="green"
              />
              <StatCard
                title="This Month"
                value="95%"
                icon={<Target className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="On-time Rate"
                value="98%"
                icon={<Clock className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Overtime Hours"
                value="12"
                icon={<Zap className="w-6 h-6" />}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Check-in</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Facial Recognition Check-in</h4>
                  <p className="text-gray-600 mb-4">Position your face in the camera frame</p>
                  <button className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                    Start Check-in
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Today's Status</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in Time:</span>
                        <span className="font-medium text-green-600">08:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">Zone A Office</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-green-600">On Time</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Digital ID Card</h5>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">Worker ID: W{user.id.slice(-4)}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded mx-auto flex items-center justify-center">
                          <span className="text-xs">QR Code</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'incentives':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Incentives & Rewards</h2>
              <p className="text-gray-600">Track your performance rewards and incentives</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Earned"
                value="₹2,450"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "₹350", isPositive: true }}
                color="green"
              />
              <StatCard
                title="This Month"
                value="₹850"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "₹150", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Performance Score"
                value="92%"
                icon={<Target className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Available Coupons"
                value="5"
                icon={<CreditCard className="w-6 h-6" />}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Rewards</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Fuel Voucher', value: '₹200', requirement: '95% attendance', available: true },
                    { name: 'Grocery Coupon', value: '₹500', requirement: '100 tasks completed', available: true },
                    { name: 'Performance Bonus', value: '₹1000', requirement: '98% quality score', available: false },
                    { name: 'Training Certificate', value: 'Certificate', requirement: 'Complete all modules', available: true }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{reward.name}</h4>
                        <p className="text-sm text-gray-600">{reward.requirement}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{reward.value}</p>
                        <button
                          className={`mt-1 px-3 py-1 text-xs font-medium rounded-full ${reward.available
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          disabled={!reward.available}
                        >
                          {reward.available ? 'Claim' : 'Locked'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h3>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'Sarah Worker', score: '98%', badge: '🥇' },
                    { rank: 2, name: 'Mike Collector', score: '96%', badge: '🥈' },
                    { rank: 3, name: 'You', score: '92%', badge: '🥉', isUser: true },
                    { rank: 4, name: 'John Cleaner', score: '89%', badge: '4️⃣' }
                  ].map((worker, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${worker.isUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{worker.badge}</span>
                        <div>
                          <p className={`font-medium ${worker.isUser ? 'text-green-900' : 'text-gray-900'}`}>
                            {worker.name}
                          </p>
                          <p className="text-sm text-gray-600">Rank #{worker.rank}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-blue-600">{worker.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Community</h2>
              <p className="text-gray-600">Connect with citizens, green champions, and workers in your area</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Members"
                value="12,450"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "4%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active This Week"
                value="4,230"
                icon={<UserCheck className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Discussions"
                value="320"
                icon={<MessageSquare className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Events"
                value="28"
                icon={<Calendar className="w-6 h-6" />}
                trend={{ value: "6%", isPositive: true }}
                color="yellow"
              />
            </div>

            {/* Member Directory */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Member Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward / Zone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Aarav Gupta', role: 'Citizen', ward: 'Ward 12', joined: '2025-09-25' },
                      { name: 'Neha Sharma', role: 'Green Champion', ward: 'Ward 8', joined: '2025-09-22' },
                      { name: 'Rohit Mehta', role: 'Worker', ward: 'Zone B', joined: '2025-09-20' },
                      { name: 'Isha Rao', role: 'Citizen', ward: 'Ward 7', joined: '2025-09-18' },
                    ].map((m, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{m.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{m.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{m.ward}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{m.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Discussions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Discussions</h3>
              <div className="space-y-4">
                {[
                  { title: 'Garbage collection timing in Ward 12', author: 'Aarav Gupta', replies: 8, date: '2025-09-25' },
                  { title: 'Ideas for plastic-free events', author: 'Neha Sharma', replies: 15, date: '2025-09-24' },
                  { title: 'Feedback on biogas plant operations', author: 'Rohit Mehta', replies: 5, date: '2025-09-23' },
                ].map((post, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">Started by {post.author} • {post.replies} replies</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Coming Soon</h3>
            <p className="text-gray-600">This feature is under development</p>
          </div>
        );
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} sidebarItems={sidebarItems}>
      {renderContent()}
    </Layout>
  );
};

export default WorkerDashboard;