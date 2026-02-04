import React, { useState, useContext } from 'react';
import registeranimation from '../assets/register.json';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion'; 
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../providers/AuthContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    // AuthContext থেকে প্রয়োজনীয় ফাংশনগুলো নেওয়া হয়েছে
    const { signInWithGoogle, createUserWithEmail, loading } = useContext(AuthContext);
    const axiosSecure = useAxios();
    
    // রিডাইরেকশনের জন্য লজিক
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [userType, setUserType] = useState('tutor');

    const handleTypeSwitch = (type) => {
        setUserType(type);
        reset(); 
    };

    // ১. গুগল রেজিস্ট্রেশন এবং রিডাইরেক্ট ফাংশন
    const handleGoogleRegister = async () => {
        const toastId = toast.loading("Processing Google Registration...");
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: 'student', 
                createdAt: new Date(),
            };

            // ডাটাবেজে ইউজার সেভ করা
            const res = await axiosSecure.post('/users', userInfo);
            
            if (res.data.success) {
                // JWT টোকেন এবং কুকি সেট করা
                await axiosSecure.post('/jwt', { email: user.email });
                toast.success("Welcome! Registration Successful.", { id: toastId });
                
                // ইউজারকে কাঙ্ক্ষিত পেজে অথবা হোমে পাঠানো
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Google Registration Failed", { id: toastId });
        }
    };
    
    // ২. ইমেইল/পাসওয়ার্ড রেজিস্ট্রেশন এবং রিডাইরেক্ট ফাংশন
    const hadnleRegistration = async (data) => {
        const toastId = toast.loading("Creating your account...");
        try {
            // ফায়ারবেস দিয়ে ইউজার তৈরি
            await createUserWithEmail(data.email, data.password);
            
            const commonData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                role: userType,
                createdAt: new Date(),
            };

            let finalData = { ...commonData };
            if (userType === 'tutor') {
                finalData.occupation = data.occupation;
                finalData.institution = data.institution;
            } else {
                finalData.institution = data.institution;
                finalData.class = data.class;
            }

            // ডাটাবেজে ইউজার ডেটা সেভ
            const response = await axiosSecure.post('/users', finalData);

            if (response.data.success) {
                // টোকেন জেনারেট এবং কুকি সেট
                await axiosSecure.post('/jwt', { email: data.email });
                
                toast.success(`Success! Registered as ${userType}`, { id: toastId });
                reset();
                
                // রিডাইরেক্ট লজিক
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Registration Failed", { id: toastId });
        }
    }

    return (
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-white/20 max-w-md lg:max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-10">
            
            <div className="md:w-1/2 justify-center sticky top-0 hidden lg:flex">
                <div className="w-full max-w-sm">
                    <Lottie animationData={registeranimation} loop={true} />
                </div>
            </div>

            <div className="md:w-1/2 w-full">
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative w-64 shadow-inner">
                    <motion.div 
                        animate={{ x: userType === 'tutor' ? 0 : '100%' }}
                        className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-primary rounded-lg shadow-md"
                    />
                    <button onClick={() => handleTypeSwitch('tutor')} className={`relative flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'tutor' ? 'text-white' : 'text-slate-500'}`}>Tutor</button>
                    <button onClick={() => handleTypeSwitch('student')} className={`relative flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'student' ? 'text-white' : 'text-slate-500'}`}>Student</button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={userType}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h1 className="font-bold text-2xl text-primary mb-5">Register As a {userType === 'tutor' ? 'Tutor' : 'Student'}</h1>
                        
                        <form onSubmit={handleSubmit(hadnleRegistration)} className="w-full">
                            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                {userType === 'student' && (
                                    <div className="md:col-span-2 space-y-4 mb-2">
                                        <button 
                                            type="button"
                                            onClick={handleGoogleRegister}
                                            className="btn btn-outline w-full flex items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                                        >
                                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                            Continue with Google
                                        </button>
                                        
                                        <div className="relative flex items-center">
                                            <div className="grow border-t border-slate-200"></div>
                                            <span className="shrink mx-4 text-slate-400 text-[10px] font-bold uppercase">Or Email</span>
                                            <div className="grow border-t border-slate-200"></div>
                                        </div>
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" className={`input w-full ${errors.name ? 'border-red-500' : ''}`} placeholder="Your Name" {...register("name", {required: "Full name is required"})} />
                                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Email <span className="text-red-500">*</span></label>
                                    <input type="email" className={`input w-full ${errors.email ? 'border-red-500' : ''}`} placeholder="Email" {...register("email", {required: "Email is required"})} />
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Phone <span className="text-red-500">*</span></label>
                                    <input type="tel" className={`input w-full ${errors.phone ? 'border-red-500' : ''}`} placeholder="Phone Number" {...register("phone", {required: "Phone is required"})} />
                                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Address <span className="text-red-500">*</span></label>
                                    <input type="text" className={`input w-full ${errors.address ? 'border-red-500' : ''}`} placeholder="Address" {...register("address", {required: "Address is required"})} />
                                    {errors.address && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.address.message}</p>}
                                </div>

                                {userType === 'tutor' ? (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Occupation <span className="text-red-500">*</span></label>
                                            <select className={`select select-bordered w-full ${errors.occupation ? 'border-red-500' : ''}`} {...register("occupation", {required: "Select occupation"})}>
                                                <option disabled value="">Pick one</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="student">Student</option>
                                            </select>
                                            {errors.occupation && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.occupation.message}</p>}
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institution Name <span className="text-red-500">*</span></label>
                                            <input type="text" className={`input w-full ${errors.institution ? 'border-red-500' : ''}`} placeholder="Institution Name" {...register("institution", {required: "Institution name is required"})} />
                                            {errors.institution && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.institution.message}</p>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institutions Name <span className="text-red-500">*</span></label>
                                            <input type="text" className={`input w-full ${errors.institution ? 'border-red-500' : ''}`} placeholder="Institution Name" {...register("institution", {required: "Institution name is required"})} />
                                            {errors.institution && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.institution.message}</p>}
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Class <span className="text-red-500">*</span></label>
                                            <select className={`select select-bordered w-full ${errors.class ? 'border-red-500' : ''}`} {...register("class", {required: "Select your class"})}>
                                                <option disabled value="">Pick one</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                                <option value="11">H.S.C</option>
                                            </select>
                                            {errors.class && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.class.message}</p>}
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Gender <span className="text-red-500">*</span></label>
                                    <select className={`select select-bordered w-full ${errors.gender ? 'border-red-500' : ''}`} {...register("gender", {required: "Gender is required"})}>
                                        <option disabled value="">Pick one</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.gender.message}</p>}
                                </div>

                                <div className="md:col-span-1 hidden md:block"></div> 

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Password <span className="text-red-500">*</span></label>
                                    <input type="password" className={`input w-full ${errors.password ? 'border-red-500' : ''}`} placeholder="Password" {...register("password", {required: "Password is required", minLength: {value: 6, message: "Minimum 6 characters"}})} />
                                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Re Password <span className="text-red-500">*</span></label>
                                    <input type="password" className={`input w-full ${errors.repassword ? 'border-red-500' : ''}`} placeholder="Confirm Password" {...register("repassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === watch('password') || "Passwords do not match"
                                    })} />
                                    {errors.repassword && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.repassword.message}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="btn btn-primary mt-6 md:col-span-2 w-full uppercase font-black"
                                >
                                    {loading ? "Processing..." : "Submit & Register"}
                                </button>
                            </fieldset>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Register;