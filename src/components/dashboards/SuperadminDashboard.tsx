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
  Database,
  Calendar,
  Package,
  Truck,
  Building,
  PieChart,
  Activity
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';
import HeatMap from '../common/HeatMap';
import VehicleTracker from '../common/VehicleTracker';

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
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Tracking', active: activeTab === 'vehicles', onClick: () => setActiveTab('vehicles') },
    { icon: <Award className="w-5 h-5" />, label: 'Leaderboard', active: activeTab === 'leaderboard', onClick: () => setActiveTab('leaderboard') },
    { icon: <Target className="w-5 h-5" />, label: 'Vouchers & Incentives', active: activeTab === 'vouchers', onClick: () => setActiveTab('vouchers') },
    { icon: <Shield className="w-5 h-5" />, label: 'Penalties', active: activeTab === 'penalties', onClick: () => setActiveTab('penalties') },
    { icon: <Recycle className="w-5 h-5" />, label: 'Waste Analytics', active: activeTab === 'waste', onClick: () => setActiveTab('waste') },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'E-commerce', active: activeTab === 'ecommerce', onClick: () => setActiveTab('ecommerce') },
    { icon: <Package className="w-5 h-5" />, label: 'Inventory', active: activeTab === 'inventory', onClick: () => setActiveTab('inventory') },
    { icon: <Calendar className="w-5 h-5" />, label: 'Campaigns', active: activeTab === 'campaigns', onClick: () => setActiveTab('campaigns') },
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

      case 'heatmaps':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">City-wide Heat Maps</h2>
              <p className="text-gray-600">Monitor cleanliness trends and identify problem areas</p>
            </div>
            <HeatMap />
          </div>
        );

      case 'vehicles':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking System</h2>
              <p className="text-gray-600">Real-time monitoring of all waste collection vehicles</p>
            </div>
            <VehicleTracker userRole="superadmin" />
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">System Leaderboard</h2>
              <p className="text-gray-600">Performance rankings across all user categories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Areas</h3>
                <div className="space-y-4">
                  {[
                    { rank: 1, area: 'Zone A', score: '9.8/10', badge: '🥇', improvement: '+0.3' },
                    { rank: 2, area: 'Zone C', score: '9.5/10', badge: '🥈', improvement: '+0.5' },
                    { rank: 3, area: 'Zone B', score: '9.2/10', badge: '🥉', improvement: '+0.2' },
                    { rank: 4, area: 'Zone D', score: '8.9/10', badge: '4️⃣', improvement: '+0.1' }
                  ].map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{area.badge}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{area.area}</p>
                          <p className="text-sm text-gray-600">Rank #{area.rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{area.score}</p>
                        <p className="text-xs text-green-500">{area.improvement} this month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Green Champions</h3>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'Priya Sharma', points: '2,450', badge: '🥇', area: 'Zone A' },
                    { rank: 2, name: 'Rajesh Kumar', points: '2,320', badge: '🥈', area: 'Zone B' },
                    { rank: 3, name: 'Anita Patel', points: '2,180', badge: '🥉', area: 'Zone C' },
                    { rank: 4, name: 'Suresh Gupta', points: '2,050', badge: '4️⃣', area: 'Zone D' }
                  ].map((champion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{champion.badge}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{champion.name}</p>
                          <p className="text-sm text-gray-600">{champion.area}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-purple-600">{champion.points} pts</p>
                        <p className="text-xs text-gray-500">Rank #{champion.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'campaigns':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h2>
                <p className="text-gray-600">Manage city-wide environmental campaigns</p>
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Calendar className="w-5 h-5" />
                Create Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active Campaigns"
                value="12"
                icon={<Activity className="w-6 h-6" />}
                trend={{ value: "3", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Total Participants"
                value="8,450"
                icon={<Users className="w-6 h-6" />}
                trend={{ value: "1,200", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Completed This Month"
                value="5"
                icon={<Award className="w-6 h-6" />}
                color="purple"
              />
              <StatCard
                title="Success Rate"
                value="87%"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "5%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Campaign Schedule</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Clean Streets Drive', area: 'Zone A', schedule: 'Weekly - Sundays', participants: 450, status: 'Active' },
                      { name: 'Waste Segregation Workshop', area: 'Zone B', schedule: 'Monthly - 1st Saturday', participants: 320, status: 'Scheduled' },
                      { name: 'Green Champion Training', area: 'City-wide', schedule: 'Quarterly', participants: 180, status: 'Active' },
                      { name: 'School Awareness Program', area: 'Zone C', schedule: 'Bi-weekly', participants: 600, status: 'Completed' }
                    ].map((campaign, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.schedule}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.participants}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            campaign.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : campaign.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                          <button className="text-green-600 hover:text-green-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h2>
              <p className="text-gray-600">Track equipment, vehicles, and resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Vehicles"
                value="45"
                icon={<Truck className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active Vehicles"
                value="42"
                icon={<Activity className="w-6 h-6" />}
                color="green"
              />
              <StatCard
                title="Maintenance Due"
                value="8"
                icon={<AlertTriangle className="w-6 h-6" />}
                color="yellow"
              />
              <StatCard
                title="Equipment Value"
                value="₹2.4Cr"
                icon={<Package className="w-6 h-6" />}
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Fleet Status</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Compactor Trucks', total: 15, active: 14, maintenance: 1 },
                    { type: 'Side Loaders', total: 12, active: 11, maintenance: 1 },
                    { type: 'Front Loaders', total: 8, active: 8, maintenance: 0 },
                    { type: 'Roll-off Trucks', total: 10, active: 9, maintenance: 1 }
                  ].map((vehicle, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{vehicle.type}</h4>
                        <span className="text-sm text-gray-500">Total: {vehicle.total}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">Active: {vehicle.active}</span>
                        <span className="text-yellow-600">Maintenance: {vehicle.maintenance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Equipment Inventory</h3>
                <div className="space-y-4">
                  {[
                    { item: 'Waste Bins (Large)', quantity: 450, status: 'Good', lastUpdated: '2024-01-15' },
                    { item: 'Safety Equipment Sets', quantity: 120, status: 'Good', lastUpdated: '2024-01-14' },
                    { item: 'Collection Tools', quantity: 200, status: 'Fair', lastUpdated: '2024-01-13' },
                    { item: 'Cleaning Supplies', quantity: 80, status: 'Low Stock', lastUpdated: '2024-01-12' }
                  ].map((equipment, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{equipment.item}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          equipment.status === 'Good' 
                            ? 'bg-green-100 text-green-800'
                            : equipment.status === 'Fair'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {equipment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Quantity: {equipment.quantity}</span>
                        <span>Updated: {equipment.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'penalties':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Penalty Management</h2>
              <p className="text-gray-600">Monitor and manage penalties across the system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Penalties"
                value="156"
                icon={<AlertTriangle className="w-6 h-6" />}
                trend={{ value: "12", isPositive: false }}
                color="red"
              />
              <StatCard
                title="This Month"
                value="23"
                icon={<Calendar className="w-6 h-6" />}
                trend={{ value: "5", isPositive: false }}
                color="yellow"
              />
              <StatCard
                title="Amount Collected"
                value="₹45,600"
                icon={<DollarSign className="w-6 h-6" />}
                trend={{ value: "₹8,200", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Pending Appeals"
                value="8"
                icon={<FileText className="w-6 h-6" />}
                color="blue"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Recent Penalties</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 'P001', user: 'Worker - John Smith', type: 'Missed Collection', amount: '₹500', status: 'Paid', date: '2024-01-15' },
                      { id: 'P002', user: 'Citizen - Priya Sharma', type: 'Improper Disposal', amount: '₹200', status: 'Pending', date: '2024-01-14' },
                      { id: 'P003', user: 'Worker - Mike Wilson', type: 'Late Arrival', amount: '₹300', status: 'Appeal', date: '2024-01-13' }
                    ].map((penalty, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{penalty.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penalty.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penalty.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penalty.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            penalty.status === 'Paid' 
                              ? 'bg-green-100 text-green-800'
                              : penalty.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {penalty.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penalty.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'ecommerce':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">E-commerce Platform</h2>
              <p className="text-gray-600">Revenue from recycled materials and eco-products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="₹2,45,600"
                icon={<DollarSign className="w-6 h-6" />}
                trend={{ value: "15%", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Products Sold"
                value="1,250"
                icon={<ShoppingCart className="w-6 h-6" />}
                trend={{ value: "120", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Active Listings"
                value="89"
                icon={<Package className="w-6 h-6" />}
                trend={{ value: "8", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Customer Rating"
                value="4.6/5"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "0.2", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {[
                    { product: 'Recycled Paper Products', sales: '₹45,600', units: 450, growth: '+12%' },
                    { product: 'Compost Fertilizer', sales: '₹38,200', units: 320, growth: '+18%' },
                    { product: 'Eco-friendly Bags', sales: '₹32,800', units: 280, growth: '+8%' },
                    { product: 'Recycled Plastic Items', sales: '₹28,400', units: 240, growth: '+15%' }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{product.product}</p>
                        <p className="text-sm text-gray-600">{product.units} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{product.sales}</p>
                        <p className="text-xs text-green-500">{product.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recycled Materials</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="font-semibold text-green-600">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Eco Products</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="font-semibold text-blue-600">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Services</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="font-semibold text-purple-600">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

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