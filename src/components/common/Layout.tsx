import React, { ReactNode } from 'react';
import { User } from '../../App';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: ReactNode;
  sidebarItems: Array<{
    icon: ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }>;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, sidebarItems }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 ml-80 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;