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
  Calendar,
  Award,
  Shield
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';

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
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Heat Maps', active: activeTab === 'heatmaps', onClick: () => setActiveTab('heatmaps') },
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Tracking', active: activeTab === 'vehicles', onClick: () => setActiveTab('vehicles') },
    { icon: <Target className="w-5 h-5" />, label: 'Vouchers', active: activeTab === 'vouchers', onClick: () => setActiveTab('vouchers') },
    { icon: <Shield className="w-5 h-5" />, label: 'Penalties', active: activeTab === 'penalties', onClick: () => setActiveTab('penalties') },
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

      case 'training':
        return <TrainingSystem user={user} />;

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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            voucher.status === 'Claimed' 
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