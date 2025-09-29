import React, { useState } from 'react';
import {
  ClipboardList,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  UserCheck,
  GraduationCap,
  Truck,
  DollarSign,
  Target,
  Zap,
  TrendingUp,
  Award,
  Shield,
  Camera,
  Package,
  Activity,
  PieChart,
  Clock,
  Presentation,
  Calendar
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';
import HeatMap from '../common/HeatMap';
import VehicleTracker from '../common/VehicleTracker';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('complaints');

  const sidebarItems = [
    { icon: <ClipboardList className="w-5 h-5" />, label: 'Complaints', active: activeTab === 'complaints', onClick: () => setActiveTab('complaints') },
    { icon: <Users className="w-5 h-5" />, label: 'Workers', active: activeTab === 'workers', onClick: () => setActiveTab('workers') },
    { icon: <UserCheck className="w-5 h-5" />, label: 'Green Champions', active: activeTab === 'champions', onClick: () => setActiveTab('champions') },
    { icon: <Users className="w-5 h-5" />, label: 'Citizens', active: activeTab === 'citizens', onClick: () => setActiveTab('citizens') },
    { icon: <Camera className="w-5 h-5" />, label: 'Work Verification', active: activeTab === 'verification', onClick: () => setActiveTab('verification') },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Heat Maps', active: activeTab === 'heatmaps', onClick: () => setActiveTab('heatmaps') },
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Tracking', active: activeTab === 'vehicles', onClick: () => setActiveTab('vehicles') },
    { icon: <Package className="w-5 h-5" />, label: 'Uber for Garbage', active: activeTab === 'uber', onClick: () => setActiveTab('uber') },
    { icon: <Target className="w-5 h-5" />, label: 'Vouchers', active: activeTab === 'vouchers', onClick: () => setActiveTab('vouchers') },
    { icon: <Shield className="w-5 h-5" />, label: 'Penalties', active: activeTab === 'penalties', onClick: () => setActiveTab('penalties') },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Salary Tracking', active: activeTab === 'salary', onClick: () => setActiveTab('salary') },
    { icon: <PieChart className="w-5 h-5" />, label: 'Analytics', active: activeTab === 'analytics', onClick: () => setActiveTab('analytics') },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Revenue', active: activeTab === 'revenue', onClick: () => setActiveTab('revenue') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'complaints':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complaint Management</h2>
              <p className="text-gray-600">Monitor and manage citizen complaints</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Complaints"
                value="1,247"
                icon={<ClipboardList className="w-6 h-6" />}
                trend={{ value: "8%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Resolved Today"
                value="89"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Pending"
                value="156"
                icon={<AlertCircle className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: false }}
                color="yellow"
              />
              <StatCard
                title="Avg Resolution Time"
                value="2.4h"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "15%", isPositive: true }}
                color="purple"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 'C001', location: 'MG Road', type: 'Overflowing Bin', status: 'Pending', assignedTo: 'John Worker' },
                      { id: 'C002', location: 'Park Street', type: 'Illegal Dumping', status: 'In Progress', assignedTo: 'Sarah Worker' },
                      { id: 'C003', location: 'Main Square', type: 'Missed Collection', status: 'Resolved', assignedTo: 'Mike Worker' }
                    ].map((complaint, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${complaint.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : complaint.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.assignedTo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                          <button className="text-green-600 hover:text-green-900">Assign</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'workers':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Worker Management</h2>
              <p className="text-gray-600">Monitor worker performance and attendance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active Workers"
                value="45"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Present Today"
                value="42"
                icon={<UserCheck className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Tasks Completed"
                value="127"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "8%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Avg Performance"
                value="87%"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Worker Status</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Today</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Worker', area: 'Zone A', status: 'Active', tasks: '5/6', performance: '92%' },
                      { name: 'Sarah Worker', area: 'Zone B', status: 'Active', tasks: '4/5', performance: '88%' },
                      { name: 'Mike Worker', area: 'Zone C', status: 'Offline', tasks: '3/4', performance: '85%' }
                    ].map((worker, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${worker.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {worker.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.tasks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.performance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                          <button className="text-green-600 hover:text-green-900">Assign Task</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'champions':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Green Champions</h2>
              <p className="text-gray-600">Track contributions and engagement of Green Champions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active Champions"
                value="120"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "6%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Events Organized"
                value="34"
                icon={<Calendar className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Awareness Sessions"
                value="89"
                icon={<Presentation className="w-6 h-6" />}
                trend={{ value: "9%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Avg Impact Score"
                value="91%"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Champion Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Aarav Champion', region: 'Ward 12', status: 'Active', events: '3', impact: '95%' },
                      { name: 'Neha Champion', region: 'Ward 8', status: 'Active', events: '2', impact: '89%' },
                      { name: 'Rohit Champion', region: 'Ward 15', status: 'Inactive', events: '0', impact: '70%' }
                    ].map((champion, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {champion.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {champion.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${champion.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {champion.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {champion.events}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {champion.impact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Assign Event
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );


      case 'training':
        return <TrainingSystem user={user} />;

      case 'heatmaps':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Area Heat Maps</h2>
              <p className="text-gray-600">Monitor cleanliness trends in your administrative area</p>
            </div>
            <HeatMap />
          </div>
        );

      case 'vehicles':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking</h2>
              <p className="text-gray-600">Monitor waste collection vehicles in your area</p>
            </div>
            <VehicleTracker userRole="admin" />
          </div>
        );

      case 'verification':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Work Verification</h2>
              <p className="text-gray-600">Review and verify worker task completions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Pending Verifications"
                value="23"
                icon={<Camera className="w-6 h-6" />}
                color="yellow"
              />
              <StatCard
                title="Verified Today"
                value="45"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "8", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Rejected"
                value="3"
                icon={<AlertCircle className="w-6 h-6" />}
                color="red"
              />
              <StatCard
                title="Verification Rate"
                value="94%"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="blue"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Work Submissions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      id: 'W001',
                      worker: 'John Worker',
                      task: 'Cleaned overflowing bin at MG Road',
                      location: 'MG Road, Sector 15',
                      submittedAt: '2 hours ago',
                      hasPhoto: true,
                      hasGeoTag: true
                    },
                    {
                      id: 'W002',
                      worker: 'Sarah Cleaner',
                      task: 'Removed illegal dumping',
                      location: 'Park Street, Area 12',
                      submittedAt: '4 hours ago',
                      hasPhoto: true,
                      hasGeoTag: true
                    }
                  ].map((submission, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">{submission.id}</span>
                            {submission.hasGeoTag && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                Geo-tagged
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">{submission.task}</h4>
                          <p className="text-gray-600 mb-2">Worker: {submission.worker}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {submission.location}
                            </span>
                            <span>Submitted {submission.submittedAt}</span>
                          </div>
                        </div>
                        {submission.hasPhoto && (
                          <div className="ml-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-1">Photo evidence</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                          ✓ Approve
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                          ✗ Reject
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'uber':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Uber for Garbage</h2>
              <p className="text-gray-600">On-demand waste collection service management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active Requests"
                value="12"
                icon={<Truck className="w-6 h-6" />}
                color="blue"
              />
              <StatCard
                title="Completed Today"
                value="45"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "8", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Average Response"
                value="35 min"
                icon={<Activity className="w-6 h-6" />}
                trend={{ value: "5 min", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Customer Rating"
                value="4.7/5"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "0.1", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Live Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 'UG001', customer: 'Priya Sharma', location: 'MG Road, Apt 5B', type: 'Bulk Waste', status: 'In Progress', worker: 'John Worker' },
                      { id: 'UG002', customer: 'Rajesh Kumar', location: 'Park Street, House 12', type: 'E-Waste', status: 'Assigned', worker: 'Sarah Collector' },
                      { id: 'UG003', customer: 'Anita Patel', location: 'City Center, Office 3F', type: 'Garden Waste', status: 'Pending', worker: 'Not Assigned' }
                    ].map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${request.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : request.status === 'Assigned'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.worker}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'salary':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Salary Tracking</h2>
              <p className="text-gray-600">Monitor worker salaries and payments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Payroll"
                value="₹4,56,000"
                icon={<DollarSign className="w-6 h-6" />}
                trend={{ value: "₹23,000", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Workers Paid"
                value="42/45"
                icon={<Users className="w-6 h-6" />}
                color="blue"
              />
              <StatCard
                title="Pending Payments"
                value="3"
                icon={<AlertCircle className="w-6 h-6" />}
                color="yellow"
              />
              <StatCard
                title="Average Salary"
                value="₹10,800"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "₹500", isPositive: true }}
                color="purple"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Salary Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incentives</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Worker', base: '₹10,000', incentives: '₹1,200', deductions: '₹200', net: '₹11,000', status: 'Paid' },
                      { name: 'Sarah Cleaner', base: '₹10,000', incentives: '₹800', deductions: '₹0', net: '₹10,800', status: 'Paid' },
                      { name: 'Mike Collector', base: '₹10,000', incentives: '₹500', deductions: '₹300', net: '₹10,200', status: 'Pending' }
                    ].map((worker, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.base}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{worker.incentives}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{worker.deductions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.net}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${worker.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {worker.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Comprehensive analytics and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Collection Efficiency"
                value="94%"
                icon={<PieChart className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Worker Performance"
                value="87%"
                icon={<Activity className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Citizen Satisfaction"
                value="4.3/5"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "0.2", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Cost per Collection"
                value="₹45"
                icon={<DollarSign className="w-6 h-6" />}
                trend={{ value: "₹3", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Area Performance</h3>
                <div className="space-y-4">
                  {[
                    { area: 'Zone A', score: 9.2, collections: 450, complaints: 12, color: 'green' },
                    { area: 'Zone B', score: 8.8, collections: 380, complaints: 18, color: 'blue' },
                    { area: 'Zone C', score: 8.5, collections: 420, complaints: 25, color: 'yellow' },
                    { area: 'Zone D', score: 7.9, collections: 350, complaints: 32, color: 'red' }
                  ].map((zone, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{zone.area}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${zone.color === 'green' ? 'bg-green-100 text-green-800' :
                          zone.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            zone.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {zone.score}/10
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Collections: {zone.collections}</span>
                        <span>Complaints: {zone.complaints}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Resource Utilization</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicle Utilization</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Worker Capacity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="font-semibold text-blue-600">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Route Efficiency</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="font-semibold text-purple-600">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fuel Efficiency</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <span className="font-semibold text-yellow-600">73%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'citizens':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Citizen Management</h2>
              <p className="text-gray-600">Monitor citizen engagement and participation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Registered Citizens"
                value="12,450"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "8%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active This Month"
                value="8,920"
                icon={<Zap className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Training Completed"
                value="6,780"
                icon={<GraduationCap className="w-6 h-6" />}
                trend={{ value: "15%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Avg Satisfaction"
                value="4.3/5"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "0.2", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Citizen Engagement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">App Downloads</span>
                    <span className="font-semibold text-blue-600">15,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span className="font-semibold text-green-600">3,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Complaints Submitted</span>
                    <span className="font-semibold text-orange-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Feedback Provided</span>
                    <span className="font-semibold text-purple-600">2,890</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Area-wise Distribution</h3>
                <div className="space-y-4">
                  {[
                    { area: 'Zone A', citizens: 3200, active: 2450, engagement: '76%' },
                    { area: 'Zone B', citizens: 2800, active: 2100, engagement: '75%' },
                    { area: 'Zone C', citizens: 3500, active: 2800, engagement: '80%' },
                    { area: 'Zone D', citizens: 2950, active: 2200, engagement: '75%' }
                  ].map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{zone.area}</p>
                        <p className="text-sm text-gray-500">{zone.active}/{zone.citizens} active</p>
                      </div>
                      <span className="font-semibold text-green-600">{zone.engagement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'vouchers':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Voucher Management</h2>
              <p className="text-gray-600">Manage incentive vouchers and rewards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Vouchers"
                value="850"
                icon={<Target className="w-6 h-6" />}
                trend={{ value: "50", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Vouchers Claimed"
                value="620"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "45", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Pending Claims"
                value="230"
                icon={<Clock className="w-6 h-6" />}
                trend={{ value: "-12", isPositive: false }}   
                color="yellow"
              />
              <StatCard
                title="Redemption Rate"
                value="73%"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="purple"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Recent Voucher Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 'V001', user: 'John Citizen', type: 'Green Points', value: '₹100', status: 'Claimed', date: '2024-01-15' },
                      { id: 'V002', user: 'Sarah Green', type: 'Training Bonus', value: '₹50', status: 'Pending', date: '2024-01-14' },
                      { id: 'V003', user: 'Mike Worker', type: 'Performance', value: '₹200', status: 'Claimed', date: '2024-01-13' }
                    ].map((voucher, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voucher.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${voucher.status === 'Claimed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {voucher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default AdminDashboard;