import React, { ReactNode, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen((s) => !s)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed left-0 top-16 z-40 w-80',
          'h-[calc(100vh-4rem)]',                // header is 4rem tall
          'bg-white border-r border-gray-200 shadow-sm',
          'transform transition-transform duration-300',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // Make it scrollable on mobile
          'overflow-y-auto overscroll-contain touch-pan-y',
        ].join(' ')}
        // Safe-area padding for iOS bottom inset
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
      >
        <nav className="p-4 sm:p-6">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileOpen(false); // Close mobile menu on item click
                  }}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                    item.active
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  ].join(' ')}
                >
                  <div className={`flex-shrink-0 ${item.active ? 'text-white' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
