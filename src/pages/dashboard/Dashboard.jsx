import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaUser, FaUsers, FaBook, FaPlusCircle, FaHistory } from "react-icons/fa";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/users/role/${user.email}`)
                .then(res => setRole(res.data.role));
        }
    }, [user]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white p-6">
                <h1 className="text-2xl font-bold text-orange-500 mb-10 italic">ETuition BD</h1>
                
                <ul className="space-y-4">
                    {/* Admin Menu */}
                    {role === 'admin' && (
                        <>
                            <p className="text-xs text-slate-500 uppercase font-bold">Admin Menu</p>
                            <li><NavLink to="/dashboard/manage-tuitions" className="flex items-center gap-2 hover:text-orange-400"><FaBook /> Manage Tuitions</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users" className="flex items-center gap-2 hover:text-orange-400"><FaUsers /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/analytics" className="flex items-center gap-2 hover:text-orange-400"><FaUsers /> Analytics</NavLink></li>
                        </>
                    )}

                    {/* Student Menu */}
                    {role === 'student' && (
                        <>
                            <p className="text-xs text-slate-500 uppercase font-bold">Student Menu</p>
                            <li><NavLink to="/dashboard/post-tuition" className="flex items-center gap-2 hover:text-orange-400"><FaPlusCircle /> Post Tuition</NavLink></li>
                            <li><NavLink to="/dashboard/my-posts" className="flex items-center gap-2 hover:text-orange-400"><FaBook /> My Posts</NavLink></li>
                            <li><NavLink to="/dashboard/applied-tutors" className="flex items-center gap-2 hover:text-orange-400"><FaUsers /> Applied Tutors</NavLink></li>
                        </>
                    )}

                    <div className="divider bg-slate-700 h-px my-6"></div>
                    <li><NavLink to="/dashboard/profile" className="flex items-center gap-2 hover:text-orange-400"><FaUser /> My Profile</NavLink></li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;