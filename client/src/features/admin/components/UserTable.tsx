import React from 'react';

interface User {
  gameId: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'banned';
  createdAt: string;
}

export type UserTableSortField = keyof User;
export type UserTableSortDirection = 'asc' | 'desc';

interface UserTableProps {
  users: User[];
  sortField: UserTableSortField;
  sortDirection: UserTableSortDirection;
  onSort: (field: UserTableSortField) => void;
  onStatusChange: (userId: string, action: "active" | "suspended" | "banned") => void;
}

export function UserTable({
  users,
  sortField,
  sortDirection,
  onSort,
  onStatusChange,
}: UserTableProps) {
  const getAccountStatusBadge = (user: User) => {
    if (user.status === "banned") {
      return (
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Banned
        </span>
      );
    }
    if (user.status === "suspended") {
      return (
        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Suspended
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1.5">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Active
      </span>
    );
  };

  const getActionButton = (
    gameId: string,
    action: 'active' | 'suspended' | 'banned',
    icon: React.ReactElement,
    color: string,
    title: string
  ) => {
    return (
      <div className="relative">
        <button
          onClick={() => onStatusChange(gameId, action)}
          className={`p-1.5 ${color} hover:bg-opacity-10 rounded-lg transition-colors relative`}
          title={`Double-click to ${title.toLowerCase()}`}
        >
          {icon}
        </button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">
              <button
                onClick={() => onSort('name')}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                Name
                {sortField === 'name' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">
              <button
                onClick={() => onSort('email')}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                Email
                {sortField === 'email' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">
              <button
                onClick={() => onSort('status')}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                Status
                {sortField === 'status' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {users.map((user) => (
            <tr key={user.gameId} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-game-purple/20 flex items-center justify-center text-game-purple font-medium">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div className="text-white font-medium">{user.name}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">{user.email}</td>
              <td className="px-4 py-3">
                {getAccountStatusBadge(user)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {user.status === "banned" ? (
                    getActionButton(
                      user.gameId,
                      'active',
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>,
                      "text-emerald-400 hover:text-emerald-300",
                      "Activate user"
                    )
                  ) : user.status === "suspended" ? (
                    <>
                      {getActionButton(
                        user.gameId,
                        'active',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
                        "text-emerald-400 hover:text-emerald-300",
                        "Activate user"
                      )}
                      {getActionButton(
                        user.gameId,
                        'banned',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>,
                        "text-red-400 hover:text-red-300",
                        "Block user"
                      )}
                    </>
                  ) : (
                    <>
                      {getActionButton(
                        user.gameId,
                        'suspended',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>,
                        "text-yellow-400 hover:text-yellow-300",
                        "Suspend user"
                      )}
                      {getActionButton(
                        user.gameId,
                        'banned',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>,
                        "text-red-400 hover:text-red-300",
                        "Block user"
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}