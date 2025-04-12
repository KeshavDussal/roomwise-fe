import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RoleRoute({ roles, children }) {
    const user = useSelector(state => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user || !roles.includes(user.role)) router.replace('/');
    }, [user]);

    if (!user || !roles.includes(user.role)) return null;
    return children;
}