import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const AppliedTutors = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/my-applications/${user.email}`)
                .then(res => setApplications(res.data));
        }
    }, [user]);

    // একসেপ্ট করলে পেমেন্ট পেজে রিডাইরেক্ট হবে
    const handleAccept = (app) => {
        // এখানে পেমেন্ট করার জন্য প্রয়োজনীয় ডাটা নিয়ে পেমেন্ট পেজে পাঠাতে হবে
        navigate('/dashboard/payment', { state: { appId: app._id, salary: app.expectedSalary, tutorEmail: app.tutorEmail } });
    };

    const handleReject = async (id) => {
        const res = await axios.delete(`http://localhost:3000/applications/${id}`);
        if (res.data.deletedCount > 0) {
            toast.success("Application Rejected");
            setApplications(applications.filter(a => a._id !== id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 uppercase">Tutor Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map(app => (
                    <div key={app._id} className="card bg-base-100 shadow-xl border border-slate-100 p-4">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={app.tutorImage} className="w-16 h-16 rounded-full object-cover border-2 border-orange-500" alt="" />
                            <div>
                                <h3 className="font-bold text-lg">{app.tutorName}</h3>
                                <p className="text-sm text-slate-500">{app.qualification}</p>
                            </div>
                        </div>
                        <p className="text-sm mb-2"><strong>Experience:</strong> {app.experience} years</p>
                        <p className="text-sm mb-4 font-bold text-green-600">Expected: {app.expectedSalary} BDT</p>
                        
                        <div className="flex gap-2">
                            <button onClick={() => handleAccept(app)} className="btn btn-sm btn-success text-white grow">Accept & Pay</button>
                            <button onClick={() => handleReject(app._id)} className="btn btn-sm btn-outline btn-error grow">Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedTutors;