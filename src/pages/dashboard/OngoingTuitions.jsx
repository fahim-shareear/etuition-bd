import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { FaMapMarkerAlt, FaCalendarCheck, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const [ongoingJobs, setOngoingJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            // শুধুমাত্র Approved স্ট্যাটাসের জবগুলো নিয়ে আসা
            axios.get(`http://localhost:3000/tutor-ongoing/${user?.email}`)
                .then(res => {
                    setOngoingJobs(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div className="flex justify-center p-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-4 lg:p-8">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-800 uppercase italic">Ongoing Tuitions</h2>
                <p className="text-slate-500 font-medium">Manage your active teaching assignments and student contacts.</p>
            </header>

            {ongoingJobs.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCalendarCheck className="text-slate-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 uppercase">No Active Tuitions</h3>
                    <p className="text-slate-400 text-sm mt-1">Wait for students to approve your applications after payment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ongoingJobs.map(job => (
                        <div key={job._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                            {/* Card Header */}
                            <div className="bg-green-600 p-6 text-white flex justify-between items-start">
                                <div>
                                    <span className="bg-green-700/50 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Active Job</span>
                                    <h3 className="text-2xl font-black uppercase mt-2 leading-none italic">{job.subject}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold opacity-80">Salary</p>
                                    <p className="text-xl font-black">${job.expectedSalary}</p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><FaMapMarkerAlt className="text-green-600 text-xs"/></div>
                                    <span className="text-sm font-bold uppercase tracking-tight">{job.location || "Remote / Not Specified"}</span>
                                </div>

                                <div className="divider opacity-10 my-1"></div>

                                {/* Student Contact Info (Unlock after approval) */}
                                <div className="bg-slate-50 rounded-2xl p-4">
                                    <p className="text-[10px] text-slate-400 uppercase font-black mb-3 tracking-widest">Student Contact</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                            <FaEnvelope className="text-slate-400" /> {job.studentEmail}
                                        </div>
                                        {/* যদি ডেটাতে ফোন নাম্বার থাকে তবে তা এখানে দেখাবে */}
                                        <div className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                            <FaPhoneAlt className="text-slate-400" /> Contact Student via Email
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="btn btn-outline btn-success w-full rounded-2xl font-black uppercase italic tracking-wider mt-2">
                                    View Class Schedule
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OngoingTuitions;