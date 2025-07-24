import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, loading }) => (
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-game-purple/50"
    />
    <svg
      className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    {loading && (
      <div className="absolute right-3 top-2.5">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-game-purple border-t-transparent"></div>
      </div>
    )}
  </div>
); 