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
  DollarSign
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';

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
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Heat Maps', active: activeTab === 'heatmaps', onClick: () => setActiveTab('heatmaps') },
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Tracking', active: activeTab === 'vehicles', onClick: () => setActiveTab('vehicles') },
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            complaint.status === 'Resolved' 
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            worker.status === 'Active' 
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