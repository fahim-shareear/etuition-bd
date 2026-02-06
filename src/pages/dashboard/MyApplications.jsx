import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // টিউটরের ইমেইল দিয়ে অ্যাপ্লিকেশনগুলো নিয়ে আসা
    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3000/my-applications/${user?.email}`);
            setApplications(res.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // অ্যাপ্লিকেশন ডিলিট করার ফাংশন (রিকোয়ারমেন্ট: এপ্রুভ হওয়ার আগে ডিলিট করা যাবে)
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to withdraw this application?")) {
            try {
                const res = await axios.delete(`http://localhost:3000/applications/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Application withdrawn successfully");
                    setApplications(applications.filter(app => app._id !== id));
                }
            } catch (error) {
                toast.error("Delete failed", error.message);
            }
        }
    };

    if (loading) return <div className="text-center p-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black mb-6 text-slate-800 uppercase italic">
                My Tuition Applications ({applications.length})
            </h2>

            {applications.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No applications found!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-slate-100">
                            <tr className="text-slate-700 uppercase text-[10px] tracking-widest">
                                <th>Tuition Info</th>
                                <th>Expected Salary</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                                    <td>
                                        <div className="font-black text-slate-700 uppercase">{app.subject}</div>
                                        <div className="text-[10px] text-slate-400 font-bold italic">Student: {app.studentEmail}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-orange-600">${app.expectedSalary}</div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm font-black uppercase py-3 px-4 ${
                                            app.status === 'Approved' ? 'badge-success text-white' : 
                                            app.status === 'Rejected' ? 'badge-error text-white' : 
                                            'badge-warning text-white'
                                        }`}>
                                            {app.status === 'Approved' && <FaCheckCircle className="mr-1" />}
                                            {app.status === 'Rejected' && <FaTimesCircle className="mr-1" />}
                                            {app.status === 'Pending' && <FaClock className="mr-1" />}
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* যদি স্ট্যাটাস এপ্রুভড না হয়, তবেই ডিলিট বাটন দেখাবে (রিকোয়ারমেন্ট অনুযায়ী) */}
                                        {app.status !== 'Approved' ? (
                                            <button 
                                                onClick={() => handleDelete(app._id)}
                                                className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
                                                title="Delete Application"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-300 uppercase italic">Locked</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyApplications;