import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SuperadminDashboard from './components/dashboards/SuperadminDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import GreenChampionDashboard from './components/dashboards/GreenChampionDashboard';
import WorkerDashboard from './components/dashboards/WorkerDashboard';
import CitizenDashboard from './components/dashboards/CitizenDashboard';
// import { SpeedInsights } from "@vercel/speed-insights/next";

export type UserRole = 'superadmin' | 'admin' | 'green-champion' | 'worker' | 'citizen';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole, email: string) => {
    // Mock user data - in real app this would come from authentication
    const user: User = {
      id: `${role}-${Date.now()}`,
      email,
      role,
      name: role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')
    };
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'superadmin':
        return <SuperadminDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      case 'green-champion':
        return <GreenChampionDashboard user={currentUser} onLogout={handleLogout} />;
      case 'worker':
        return <WorkerDashboard user={currentUser} onLogout={handleLogout} />;
      case 'citizen':
        return <CitizenDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderDashboard()}</div>;
}

export default App;