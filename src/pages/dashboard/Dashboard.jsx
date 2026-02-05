import React from 'react';
import { Outlet, NavLink, Link } from 'react-router';
import { FaHome, FaUser, FaBook, FaUsers, FaPlusCircle, FaHistory } from 'react-icons/fa';
// import useRole from '../hooks/useRole';
// import Logo from '../components/shared/Logo';
import useRole from '../../hooks/useRole';
import Logo from '../../components/shared/Logo';

const DashboardLayout = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return <div className="h-screen flex justify-center items-center bg-orange-600">
            <span className="loading loading-spinner loading-lg text-white"></span>
        </div>;
    }

    // Role-specific menus
    const adminMenu = (
        <>
            <li><NavLink to="/dashboard/manage-users" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaUsers /> Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/approve-tuition" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaBook /> Approve Tuitions</NavLink></li>
            <li><NavLink to="/dashboard/revenue" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaHistory /> Revenue</NavLink></li>
        </>
    );

    const tutorMenu = (
        <>
            <li><NavLink to="/dashboard/find-jobs" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaPlusCircle /> Find Tuitions</NavLink></li>
            <li><NavLink to="/dashboard/my-applications" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaHistory /> Applied Jobs</NavLink></li>
            <li><NavLink to="/dashboard/payments" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaHistory /> Payments</NavLink></li>
        </>
    );

    const studentMenu = (
        <>
            <li><NavLink to="/dashboard/post-tuition" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaPlusCircle /> Post Tuition</NavLink></li>
            <li><NavLink to="/dashboard/my-posts" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaBook /> My Tuition Posts</NavLink></li>
        </>
    );

    return (
        <div className="h-screen w-full bg-orange-600 flex flex-col overflow-hidden">
            {/* Top Navbar */}
            <header className="py-4 px-6 lg:px-12 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/20">
                <Link to="/" className="scale-90 lg:scale-100"><Logo /></Link>
                <Link to="/" className="btn btn-sm btn-ghost text-white border border-white/20 hover:bg-white hover:text-orange-600 uppercase font-bold tracking-widest"><FaHome /> Home</Link>
            </header>

            <div className="flex grow overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-[#0f172a] text-white p-6 flex flex-col shadow-2xl">
                    <h2 className="text-xl font-black mb-10 text-orange-500 uppercase italic">Dashboard</h2>
                    
                    <ul className="menu menu-md p-0 space-y-3 grow overflow-y-auto">
                        <li><NavLink to="/dashboard/profile" className={({isActive}) => isActive ? "text-orange-400 font-bold" : ""}> <FaUser /> Profile</NavLink></li>
                        
                        <div className="divider opacity-20 my-2"></div>
                        
                        {/* --- DYNAMIC MENU BASED ON ROLE --- */}
                        {role === 'admin' && adminMenu}
                        {role === 'tutor' && tutorMenu}
                        {role === 'student' && studentMenu}
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-100">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;