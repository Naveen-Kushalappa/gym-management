import { Navigate } from 'react-router-dom';
import useRole from '@/Hooks/useRole';

export default function AdminRoute({ children }) {
    const role = useRole();

    if (role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
}
