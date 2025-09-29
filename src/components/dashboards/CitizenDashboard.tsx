import React, { useState } from 'react';
import { 
  ClipboardList, 
  MapPin, 
  Truck, 
  Star, 
  GraduationCap,
  Bell,
  Award,
  BarChart3,
  Camera,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Zap,
  Globe,
  Activity
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';
import VehicleTracker from '../common/VehicleTracker';
import HeatMap from '../common/HeatMap';

interface CitizenDashboardProps {
  user: User;
  onLogout: () => void;
}

const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', active: activeTab === 'dashboard', onClick: () => setActiveTab('dashboard') },
    { icon: <ClipboardList className="w-5 h-5" />, label: 'Report Issue', active: activeTab === 'report', onClick: () => setActiveTab('report') },
    { icon: <Truck className="w-5 h-5" />, label: 'Track Vehicle', active: activeTab === 'tracking', onClick: () => setActiveTab('tracking') },
    { icon: <Bell className="w-5 h-5" />, label: 'Book Collection', active: activeTab === 'booking', onClick: () => setActiveTab('booking') },
    { icon: <Calendar className="w-5 h-5" />, label: 'On-Demand Service', active: activeTab === 'ondemand', onClick: () => setActiveTab('ondemand') },
    { icon: <Award className="w-5 h-5" />, label: 'Rewards', active: activeTab === 'rewards', onClick: () => setActiveTab('rewards') },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Area Map', active: activeTab === 'map', onClick: () => setActiveTab('map') },
    { icon: <Activity className="w-5 h-5" />, label: 'Analytics', active: activeTab === 'analytics', onClick: () => setActiveTab('analytics') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Citizen Dashboard</h2>
              <p className="text-gray-600">Your waste management activities and community impact</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Reports Submitted"
                value="12"
                icon={<ClipboardList className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Issues Resolved"
                value="10"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "1", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Reward Points"
                value="450"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "50", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Training Progress"
                value="75%"
                icon={<GraduationCap className="w-6 h-6" />}
                trend={{ value: "25%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {[
                    { id: 'R001', issue: 'Overflowing bin near park', status: 'Resolved', date: '2 days ago' },
                    { id: 'R002', issue: 'Missed garbage collection', status: 'In Progress', date: '1 day ago' },
                    { id: 'R003', issue: 'Illegal dumping on street', status: 'Pending', date: '3 hours ago' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{report.issue}</p>
                        <p className="text-sm text-gray-500">{report.id} • {report.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Resolved' 
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Garbage Collection</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Next Collection</span>
                    </div>
                    <p className="text-green-700">Tomorrow at 8:00 AM</p>
                    <p className="text-sm text-green-600">Vehicle will arrive in your area</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Last Collection</span>
                    </div>
                    <p className="text-blue-700">Yesterday at 8:15 AM</p>
                    <p className="text-sm text-blue-600">Completed successfully</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200">
                    Book On-Demand Collection
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Area Cleanliness Score</h3>
                  <p className="text-blue-100">Your neighborhood is performing well!</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">8.5/10</div>
                  <div className="text-blue-100">This Week</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h2>
              <p className="text-gray-600">Help keep your community clean by reporting waste management issues</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Type
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200">
                    <option value="">Select issue type</option>
                    <option value="overflowing">Overflowing Bin</option>
                    <option value="missed">Missed Collection</option>
                    <option value="illegal">Illegal Dumping</option>
                    <option value="damaged">Damaged Bin</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                    placeholder="Enter location or use current location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                    placeholder="Describe the issue in detail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo Evidence
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Take a photo of the issue</p>
                    <button type="button" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Open Camera
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Save as Draft
                  </button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200">
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'tracking':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking</h2>
              <p className="text-gray-600">Track garbage collection vehicles in real-time</p>
            </div>
            <VehicleTracker userRole="citizen" />
          </div>
        );

      case 'training':
        return <TrainingSystem user={user} />;

      case 'map':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Area Cleanliness Map</h2>
              <p className="text-gray-600">View cleanliness status of different areas</p>
            </div>
            <HeatMap />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Analytics</h2>
              <p className="text-gray-600">Track your environmental impact and contributions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Reports Submitted"
                value="12"
                icon={<ClipboardList className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Issues Resolved"
                value="10"
                icon={<CheckCircle className="w-6 h-6" />}
                trend={{ value: "1", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Environmental Impact"
                value="85 kg"
                icon={<Globe className="w-6 h-6" />}
                trend={{ value: "12 kg", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Community Rank"
                value="#23"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "5", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Activity</h3>
                <div className="space-y-4">
                  {[
                    { month: 'January', reports: 4, resolved: 3, points: 150 },
                    { month: 'December', reports: 3, resolved: 3, points: 120 },
                    { month: 'November', reports: 5, resolved: 4, points: 180 }
                  ].map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{month.month}</p>
                        <p className="text-sm text-gray-600">{month.reports} reports, {month.resolved} resolved</p>
                      </div>
                      <span className="font-semibold text-green-600">{month.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Area Performance</h3>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">8.5/10</div>
                    <p className="text-gray-700 font-medium">Your Area Score</p>
                    <p className="text-sm text-gray-600 mt-1">Above city average (7.8)</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Waste Collection</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cleanliness</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Citizen Participation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Points</h2>
              <p className="text-gray-600">Track your points and redeem rewards</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Reward Points</h3>
                  <p className="text-purple-100">Keep earning by reporting issues and participating!</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">450</div>
                  <div className="text-purple-100">Total Points</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Rewards</h3>
                <div className="space-y-4">
                  {[
                    { reward: 'Shopping Voucher ₹100', cost: '200 points', available: true },
                    { reward: 'Movie Ticket', cost: '300 points', available: true },
                    { reward: 'Eco-friendly Kit', cost: '500 points', available: false },
                    { reward: 'Restaurant Voucher ₹500', cost: '800 points', available: false }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{reward.reward}</p>
                        <p className="text-sm text-gray-600">{reward.cost}</p>
                      </div>
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          reward.available 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!reward.available}
                      >
                        {reward.available ? 'Redeem' : 'Locked'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Earn Points</h3>
                <div className="space-y-3">
                  {[
                    { activity: 'Report waste issue', points: '+25 points' },
                    { activity: 'Complete training module', points: '+50 points' },
                    { activity: 'Verify issue resolution', points: '+15 points' },
                    { activity: 'Participate in cleanup', points: '+100 points' },
                    { activity: 'Refer a friend', points: '+75 points' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{item.activity}</span>
                      <span className="font-semibold text-green-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'ondemand':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">On-Demand Collection</h2>
              <p className="text-gray-600">Book immediate or scheduled waste collection services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Bookings This Month"
                value="8"
                icon={<Calendar className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Completed"
                value="6"
                icon={<CheckCircle className="w-6 h-6" />}
                color="green"
              />
              <StatCard
                title="Avg Response Time"
                value="45 min"
                icon={<Clock className="w-6 h-6" />}
                trend={{ value: "5 min", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Satisfaction"
                value="4.8/5"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "0.2", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Book Collection Service</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200">
                      <option value="">Select service type</option>
                      <option value="bulk">Bulk Waste Collection</option>
                      <option value="hazardous">Hazardous Waste</option>
                      <option value="electronic">E-Waste</option>
                      <option value="garden">Garden Waste</option>
                      <option value="construction">Construction Debris</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Collection Time
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200">
                        <Zap className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <span className="text-sm font-medium">Immediate</span>
                      </button>
                      <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                        <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                        <span className="text-sm font-medium">Schedule</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pickup Address
                    </label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">Take a photo of the waste</p>
                      <button type="button" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Open Camera
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Service Information</h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• Immediate service: 30-60 minutes</li>
                      <li>• Scheduled service: Choose your preferred time</li>
                      <li>• Photo helps us prepare the right equipment</li>
                      <li>• Service charges apply based on waste type</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Estimated Cost</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-800">Base Service Fee:</span>
                        <span className="font-semibold text-green-900">₹50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-800">Waste Type Fee:</span>
                        <span className="font-semibold text-green-900">₹30</span>
                      </div>
                      <div className="border-t border-green-200 pt-2 flex justify-between">
                        <span className="font-semibold text-green-900">Total:</span>
                        <span className="font-bold text-green-900">₹80</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Book Collection Service
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'OD001', type: 'Bulk Waste', date: '2024-01-15', status: 'Completed', cost: '₹120' },
                    { id: 'OD002', type: 'E-Waste', date: '2024-01-12', status: 'Completed', cost: '₹80' },
                    { id: 'OD003', type: 'Garden Waste', date: '2024-01-10', status: 'In Progress', cost: '₹60' }
                  ].map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{booking.id} - {booking.type}</p>
                        <p className="text-sm text-gray-500">Booked on {booking.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-sm font-medium text-gray-900 mt-1">{booking.cost}</p>
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

export default CitizenDashboard;