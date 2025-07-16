import { AdminLoginForm } from '../components/AdminLoginForm';
import { AdminLoginLayout } from '../components/AdminLoginLayout';
import { useAppSelector } from '../../../app/redux/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLoginPage() {
    const isAuthenticated = useAppSelector(state => state.adminAuth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/user', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <AdminLoginLayout>
            <AdminLoginForm/>
        </AdminLoginLayout>
    );
}
