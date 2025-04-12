import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const user = useSelector(state => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) router.replace('/login');
    }, [user]);

    if (!user) return null;
    return children;
}