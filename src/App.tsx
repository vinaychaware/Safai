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

const LS_KEY = 'currentUser';

const roleToName = (role: UserRole) =>
  role.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

function App() {
  // Rehydrate from localStorage on first render
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (role: UserRole, email: string) => {
    const user: User = {
      id: `${role}-${Date.now()}`,
      email,
      role,
      name: roleToName(role),
    };
    setCurrentUser(user);
    localStorage.setItem(LS_KEY, JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LS_KEY);
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
        // Fallback safety: clear bad state and show login
        localStorage.removeItem(LS_KEY);
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderDashboard()}</div>;
}

export default App;
