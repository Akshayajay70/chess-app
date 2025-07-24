import { useEffect } from 'react';
import { UserTable } from '../components/UserTable';
import type { UserTableSortField } from '../components/UserTable';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import type { FilterTypes } from '../../../app/redux/slices/user-man.slice';
import type { UpdateUserTypes } from '../../../app/redux/slices/user-man.slice';
import { AdminLayout } from '../../../shared/components/AdminLayout';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { getUsersThunk, updateUserThunk, setSearchTerm, setDebouncedSearchTerm, setPage, setSortField, setSortDirection } from '../../../app/redux/slices/user-man.slice';

export function UserManagementPage() {
  const PAGE_SIZE = 10;
  const dispatch = useAppDispatch();
  // Select all UI state from Redux
  const users = useAppSelector(state => state.adminUserMan.users);
  const total = useAppSelector(state => state.adminUserMan.total);
  const page = useAppSelector(state => state.adminUserMan.page);
  const totalPages = useAppSelector(state => state.adminUserMan.totalPages);
  const loading = useAppSelector(state => state.adminUserMan.isLoadingUsers);
  const error = useAppSelector(state => state.adminUserMan.error);
  const searchTerm = useAppSelector(state => state.adminUserMan.searchTerm);
  const debouncedSearchTerm = useAppSelector(state => state.adminUserMan.debouncedSearchTerm);
  const sortField = useAppSelector(state => state.adminUserMan.sortField);
  const sortDirection = useAppSelector(state => state.adminUserMan.sortDirection);

  // Debounce searchTerm and update debouncedSearchTerm in Redux
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setDebouncedSearchTerm(searchTerm));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, dispatch]);

  useEffect(() => {
    const filters: FilterTypes = {
      searchName: debouncedSearchTerm,
      page,
      limit: PAGE_SIZE,
      sortType: sortDirection === 'asc' ? 1 : -1,
      sortDes: sortField
    };
    dispatch(getUsersThunk(filters));
  }, [dispatch, debouncedSearchTerm, page, sortField, sortDirection]);

  const handleStatusChange = (gameId: string, status: 'active' | 'suspended' | 'banned') => {
    const update: UpdateUserTypes = { gameId, status };
    dispatch(updateUserThunk(update))
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSort = (field: UserTableSortField) => {
    if (field === sortField) {
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortField(field));
      dispatch(setSortDirection('asc'));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_access_token');
    window.location.href = '/admin/login';
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1">Manage user accounts and access</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by username or email..."
            loading={loading}
          />
        </div>

        {/* Table Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {loading && !(users && users.length) ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-game-purple border-t-transparent"></div>
              <p className="mt-2 text-slate-400">Loading users...</p>
            </div>
          ) : (
            <UserTable
              users={users}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <div className="text-sm text-slate-400">
            Showing {((page - 1) * PAGE_SIZE) + 1} to {Math.min(page * PAGE_SIZE, total)} of {total} users
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminLayout>
  );
} 