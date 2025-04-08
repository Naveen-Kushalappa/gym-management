import { Routes, Route } from 'react-router-dom';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import MemberDashboard from './Pages/Member/MemberDashboard';
import Dashboard from './Pages/Dashboard';
import Login from "@/Pages/Auth/Login.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/member" element={<MemberDashboard />} />
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />
            {/* Add more routes as needed */}
        </Routes>
    );
}
