import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Award, 
  TrendingUp, 
  AlertTriangle,
  ShoppingCart,
  Recycle,
  DollarSign,
  UserPlus,
  Settings,
  FileText,
  GraduationCap,
  Target,
  Zap,
  Globe,
  Shield,
  Database
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';

interface SuperadminDashboardProps {
  user: User;
  onLogout: () => void;
}

const SuperadminDashboard: React.FC<SuperadminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Overview', active: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { icon: <Users className="w-5 h-5" />, label: 'Admin Management', active: activeTab === 'admins', onClick: () => setActiveTab('admins') },
    { icon: <Users className="w-5 h-5" />, label: 'User Analytics', active: activeTab === 'users', onClick: () => setActiveTab('users') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Heat Maps', active: activeTab === 'heatmaps', onClick: () => setActiveTab('heatmaps') },
    { icon: <Award className="w-5 h-5" />, label: 'Leaderboard', active: activeTab === 'leaderboard', onClick: () => setActiveTab('leaderboard') },
    { icon: <Target className="w-5 h-5" />, label: 'Vouchers & Incentives', active: activeTab === 'vouchers', onClick: () => setActiveTab('vouchers') },
    { icon: <Recycle className="w-5 h-5" />, label: 'Waste Analytics', active: activeTab === 'waste', onClick: () => setActiveTab('waste') },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'E-commerce', active: activeTab === 'ecommerce', onClick: () => setActiveTab('ecommerce') },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <FileText className="w-5 h-5" />, label: 'Reports', active: activeTab === 'reports', onClick: () => setActiveTab('reports') },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', active: activeTab === 'settings', onClick: () => setActiveTab('settings') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h2>
              <p className="text-gray-600">Complete system analytics and performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Complaints"
                value="2,847"
                icon={<AlertTriangle className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Resolved Complaints"
                value="2,456"
                icon={<BarChart3 className="w-6 h-6" />}
                trend={{ value: "8%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Active Workers"
                value="156"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Revenue Generated"
                value="₹45,230"
                icon={<DollarSign className="w-6 h-6" />}
                trend={{ value: "15%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">City-wide Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Resolution Time</span>
                    <span className="font-semibold text-green-600">2.4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Worker Efficiency</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Citizen Satisfaction</span>
                    <span className="font-semibold text-purple-600">4.2/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Waste Segregation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Biomethanization</span>
                    <span className="font-semibold text-green-600">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recycled</span>
                    <span className="font-semibold text-blue-600">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waste to Energy</span>
                    <span className="font-semibold text-purple-600">23%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">System Uptime</span>
                    <span className="font-semibold text-green-600">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data Accuracy</span>
                    <span className="font-semibold text-purple-600">96.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Municipal Excellence Score</h3>
                  <p className="text-green-100">Your city is leading in waste management!</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">9.2/10</div>
                  <div className="text-green-100">Overall Rating</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admins':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Management</h2>
                <p className="text-gray-600">Manage system administrators</p>
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <UserPlus className="w-5 h-5" />
                Add New Admin
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Admins"
                value="12"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active Today"
                value="10"
                icon={<Zap className="w-6 h-6" />}
                trend={{ value: "1", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Areas Covered"
                value="8"
                icon={<Globe className="w-6 h-6" />}
                color="purple"
              />
              <StatCard
                title="Avg Performance"
                value="94%"
                icon={<Shield className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Active Administrators</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Smith', email: 'john@admin.com', area: 'Zone A', status: 'Active', performance: '96%' },
                      { name: 'Sarah Johnson', email: 'sarah@admin.com', area: 'Zone B', status: 'Active', performance: '94%' },
                      { name: 'Mike Wilson', email: 'mike@admin.com', area: 'Zone C', status: 'Inactive', performance: '89%' }
                    ].map((admin, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            admin.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.performance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
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

      case 'vouchers':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vouchers & Incentives</h2>
              <p className="text-gray-600">Manage reward systems and incentive programs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Vouchers"
                value="1,250"
                icon={<Target className="w-6 h-6" />}
                trend={{ value: "150", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Vouchers Claimed"
                value="890"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "120", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Active Campaigns"
                value="8"
                icon={<Zap className="w-6 h-6" />}
                color="purple"
              />
              <StatCard
                title="Redemption Rate"
                value="71%"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Area-wise Voucher Distribution</h3>
                <div className="space-y-4">
                  {[
                    { area: 'Zone A', provided: 320, claimed: 245, rate: '77%' },
                    { area: 'Zone B', provided: 280, claimed: 198, rate: '71%' },
                    { area: 'Zone C', provided: 350, claimed: 267, rate: '76%' },
                    { area: 'Zone D', provided: 300, claimed: 180, rate: '60%' }
                  ].map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{zone.area}</p>
                        <p className="text-sm text-gray-500">{zone.claimed}/{zone.provided} claimed</p>
                      </div>
                      <span className="font-semibold text-green-600">{zone.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Campaign Performance</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Clean Streets Challenge', participants: 450, completion: '89%', status: 'Active' },
                    { name: 'Waste Segregation Drive', participants: 320, completion: '76%', status: 'Active' },
                    { name: 'Green Champion Program', participants: 180, completion: '94%', status: 'Completed' }
                  ].map((campaign, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{campaign.participants} participants</span>
                        <span>{campaign.completion} completion</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'waste':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Waste Analytics</h2>
              <p className="text-gray-600">Comprehensive waste management analytics and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Waste Processed"
                value="2,450 tons"
                icon={<Recycle className="w-6 h-6" />}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Biomethanization"
                value="45%"
                icon={<Zap className="w-6 h-6" />}
                trend={{ value: "3%", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Recycled Material"
                value="32%"
                icon={<Recycle className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Waste to Energy"
                value="23%"
                icon={<Zap className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Segregation Efficiency</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Organic Waste</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recyclable</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="font-semibold text-blue-600">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hazardous</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="font-semibold text-red-600">92%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Processing Facilities</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Biogas Plant A', capacity: '500 tons/day', utilization: '87%', status: 'Operational' },
                    { name: 'Recycling Center B', capacity: '300 tons/day', utilization: '92%', status: 'Operational' },
                    { name: 'Waste-to-Energy Plant', capacity: '200 tons/day', utilization: '78%', status: 'Maintenance' }
                  ].map((facility, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{facility.name}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          facility.status === 'Operational' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {facility.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{facility.capacity}</span>
                        <span>{facility.utilization} utilization</span>
                      </div>
                    </div>
                  ))}
                </div>
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

export default SuperadminDashboard;