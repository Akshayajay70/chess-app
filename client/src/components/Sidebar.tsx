import { useState } from 'react';
import { Logo } from './Logo';

export function Sidebar() {
  // Local state for demonstration
  const [activePage, setActivePage] = useState('home');
  
  // Mock user data
  const user = {
    username: 'Username123',
    level: 6,
    userId: '1234567890',
    avatar: 'U'
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', path: '9 22 9 12 15 12 15 22' },
    { id: 'clan', label: 'Clan', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', path: 'M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'M8.7 14.3a1 1 0 0 1-1.4-1.4l9-9a1 1 0 0 1 1.4 1.4l-9 9z', path: 'M15 4h5v5 M9 20H4v-5' },
    { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'friends', label: 'Friends', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', path: 'M9 7a4 4 0 1 1 8 0M9 7a4 4 0 0 1 4 4M9 7a4 4 0 0 0 4 4' },
    { id: 'profile', label: 'Profile', icon: 'M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zM13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' },
    { id: 'stats', label: 'Stats', icon: 'M12 20V10 M18 20V4 M6 20v-8' },
    { id: 'notifications', label: 'Notifications', icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', path: 'M13.73 21a2 2 0 0 1-3.46 0' },
  ];

  const handleNavigation = (pageId: string) => {
    setActivePage(pageId);
    console.log('Navigate to:', pageId);
  };

  const handlePremiumClick = () => {
    console.log('Premium button clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  return (
    <div className="w-[280px] h-screen bg-sidebar-bg backdrop-blur-xl border-r border-white/5 shadow-inner-glow flex flex-col">
      {/* Logo section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-purple-500/20">
            <Logo className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mately</h1>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-purple-400/20">
            {user.avatar}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-white font-medium tracking-tight">
              {user.username}
            </div>
            <div className="text-purple-300/70 text-sm">
              Level {user.level}
            </div>
            <div className="text-slate-400 text-xs">
              ID: {user.userId}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:transition-colors hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {/* Primary Navigation */}
        <div className="space-y-1 mb-4">
          {navigationItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-lg w-full text-left transition-all duration-300 ease-in-out hover:translate-x-1 ${
                activePage === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} />
                {item.path && <path d={item.path} />}
              </svg>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {navigationItems.slice(3).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-lg w-full text-left transition-all duration-300 ease-in-out hover:translate-x-1 ${
                activePage === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} />
                {item.path && <path d={item.path} />}
              </svg>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-5 py-6 space-y-6 border-t border-white/5">
        {/* Premium Button */}
        <button
          onClick={handlePremiumClick}
          className="w-full text-white rounded-xl py-3.5 px-4 flex items-center gap-3.5 shadow-lg bg-gradient-to-r from-[#9333EA] to-[#7E22CE] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(147,51,234,0.3)]"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <span className="font-semibold tracking-wide">Get Premium</span>
        </button>

        {/* Settings */}
        <button
          onClick={handleSettingsClick}
          className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 ease-in-out hover:translate-x-1 w-full text-left"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
} 