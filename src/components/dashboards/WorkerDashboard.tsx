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
  Navigation,
  Mic,
  CreditCard,
  AlertTriangle,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';

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
    { icon: <Award className="w-5 h-5" />, label: 'Incentives', active: activeTab === 'incentives', onClick: () => setActiveTab('incentives') },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Penalties', active: activeTab === 'penalties', onClick: () => setActiveTab('penalties') },
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
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            task.priority === 'High' 
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          task.status === 'Completed' 
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
                          className={`mt-1 px-3 py-1 text-xs font-medium rounded-full ${
                            reward.available 
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
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      worker.isUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
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