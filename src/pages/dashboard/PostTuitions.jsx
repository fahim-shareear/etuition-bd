// pages/dashboard/PostTuition.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostTuition = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const tuitionInfo = {
            ...data,
            studentName: user?.displayName,
            studentEmail: user?.email,
            status: 'pending', // ডিফল্ট স্ট্যাটাস
            postedDate: new Date().toISOString()
        };

        const res = await axios.post('http://localhost:3000/tuitions', tuitionInfo);
        if (res.data.insertedId) {
            toast.success("Tuition Posted Successfully!");
            reset();
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 uppercase">Post New Tuition</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("subject")} placeholder="Subject" className="input input-bordered w-full" required />
                <input {...register("class")} placeholder="Class" className="input input-bordered w-full" required />
                <input {...register("salary")} placeholder="Budget/Salary" className="input input-bordered w-full" required />
                <input {...register("location")} placeholder="Location" className="input input-bordered w-full" required />
                <textarea {...register("description")} className="textarea textarea-bordered md:col-span-2" placeholder="Details (Time, Days per week, etc.)"></textarea>
                <button className="btn bg-orange-600 text-white md:col-span-2 border-none hover:bg-orange-700">Submit Post</button>
            </form>
        </div>
    );
};

export default PostTuition;