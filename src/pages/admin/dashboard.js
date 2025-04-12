// pages/admin/dashboard.js
import RoleRoute from '@/components/RoleRoute';

export default function Dashboard() {
    return (
        <RoleRoute roles={['admin']}>
            <div>Welcome to the admin dashboard</div>
        </RoleRoute>
    );
}
