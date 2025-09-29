import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Trophy, 
  Star, 
  Users, 
  ClipboardList,
  GraduationCap,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  Camera
} from 'lucide-react';
import { User } from '../../App';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import TrainingSystem from '../training/TrainingSystem';

interface GreenChampionDashboardProps {
  user: User;
  onLogout: () => void;
}

const GreenChampionDashboard: React.FC<GreenChampionDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', active: activeTab === 'dashboard', onClick: () => setActiveTab('dashboard') },
    { icon: <Award className="w-5 h-5" />, label: 'Green Points', active: activeTab === 'points', onClick: () => setActiveTab('points') },
    { icon: <ClipboardList className="w-5 h-5" />, label: 'Report Issues', active: activeTab === 'report', onClick: () => setActiveTab('report') },
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Verify Work', active: activeTab === 'verify', onClick: () => setActiveTab('verify') },
    { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', active: activeTab === 'leaderboard', onClick: () => setActiveTab('leaderboard') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Heat Maps', active: activeTab === 'heatmaps', onClick: () => setActiveTab('heatmaps') },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Training', active: activeTab === 'training', onClick: () => setActiveTab('training') },
    { icon: <Users className="w-5 h-5" />, label: 'Community', active: activeTab === 'community', onClick: () => setActiveTab('community') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Green Champion Dashboard</h2>
              <p className="text-gray-600">Your environmental impact and community contributions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Green Points"
                value="2,450"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "125", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Reports Submitted"
                value="23"
                icon={<ClipboardList className="w-6 h-6" />}
                trend={{ value: "3", isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Community Rank"
                value="#7"
                icon={<Trophy className="w-6 h-6" />}
                trend={{ value: "2", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Training Progress"
                value="85%"
                icon={<GraduationCap className="w-6 h-6" />}
                trend={{ value: "15%", isPositive: true }}
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Reported overflowing bin', points: '+50', time: '2 hours ago' },
                    { action: 'Completed training module', points: '+100', time: '1 day ago' },
                    { action: 'Community cleanup participation', points: '+200', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <span className="text-green-600 font-semibold">{activity.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Rewards</h3>
                <div className="space-y-4">
                  {[
                    { reward: 'Shopping Voucher ₹500', cost: '1000 points', available: true },
                    { reward: 'Eco-friendly Kit', cost: '1500 points', available: true },
                    { reward: 'Tree Plantation Certificate', cost: '2000 points', available: false }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{reward.reward}</p>
                        <p className="text-sm text-gray-500">{reward.cost}</p>
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
            </div>
          </div>
        );

      case 'points':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Green Points System</h2>
              <p className="text-gray-600">Earn points for environmental activities</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Green Points</h3>
                  <p className="text-green-100">Keep up the great work!</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">2,450</div>
                  <div className="text-green-100">Total Points</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ways to Earn Points</h3>
                <div className="space-y-3">
                  {[
                    { activity: 'Report waste issue', points: '50 points' },
                    { activity: 'Complete training module', points: '100 points' },
                    { activity: 'Community cleanup participation', points: '200 points' },
                    { activity: 'Verify worker completion', points: '25 points' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{item.activity}</span>
                      <span className="font-semibold text-green-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Points History</h3>
                <div className="space-y-3">
                  {[
                    { date: 'Today', earned: '+50', activity: 'Issue reported' },
                    { date: 'Yesterday', earned: '+100', activity: 'Training completed' },
                    { date: '2 days ago', earned: '+200', activity: 'Community event' },
                    { date: '3 days ago', earned: '+25', activity: 'Worker verification' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.activity}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <span className="font-semibold text-green-600">{item.earned}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'training':
        return <TrainingSystem user={user} />;

      case 'verify':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Worker Completion</h2>
              <p className="text-gray-600">Review and verify completed work by workers in your area</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Pending Verifications"
                value="12"
                icon={<CheckCircle className="w-6 h-6" />}
                color="yellow"
              />
              <StatCard
                title="Verified Today"
                value="8"
                icon={<Award className="w-6 h-6" />}
                trend={{ value: "3", isPositive: true }}
                color="green"
              />
              <StatCard
                title="Points Earned"
                value="200"
                icon={<Star className="w-6 h-6" />}
                trend={{ value: "50", isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Verification Rate"
                value="95%"
                icon={<TrendingUp className="w-6 h-6" />}
                trend={{ value: "2%", isPositive: true }}
                color="blue"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Work Submissions for Verification</h3>
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
                      points: 25,
                      hasPhoto: true
                    },
                    {
                      id: 'W002',
                      worker: 'Sarah Cleaner',
                      task: 'Removed illegal dumping',
                      location: 'Park Street, Area 12',
                      submittedAt: '4 hours ago',
                      points: 50,
                      hasPhoto: true
                    },
                    {
                      id: 'W003',
                      worker: 'Mike Collector',
                      task: 'Regular waste collection',
                      location: 'Residential Complex A',
                      submittedAt: '6 hours ago',
                      points: 15,
                      hasPhoto: true
                    }
                  ].map((submission, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">{submission.id}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                              {submission.points} points
                            </span>
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
                            <p className="text-xs text-gray-500 text-center mt-1">Geo-tagged photo</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                          ✓ Verify & Approve
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

export default GreenChampionDashboard;