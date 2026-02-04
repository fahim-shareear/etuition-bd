import React, { useState } from 'react';
import loginanimation from "../assets/Login.json";
import Lottie from 'lottie-react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const { signInWithEmail } = useAuth();
    // formState থেকে errors অবজেক্টটি ডিস্ট্রাকচার করা হয়েছে
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userType, setUserType] = useState("tutor");

    const hadnleLogin = (data) => {
        const toastId = toast.loading("Logging in...");
        signInWithEmail(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                toast.success("Login Successful!", { id: toastId });
                // হোম পেজে রি-রাউটিং
                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Login failed. Please try again.", { id: toastId });
            });
    };

    const handleToggle = (type) => {
        setUserType(type);
        reset();
    };

    return (
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-white/20 max-w-md lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            
            {/* Lottie Animation Side */}
            <div className="md:w-1/2 justify-center hidden lg:flex">
                <div className="w-full max-w-sm">
                    <Lottie animationData={loginanimation} loop={true} />
                </div>
            </div>

            {/* Login Form Side */}
            <div className="md:w-1/2 w-full">
                
                {/* Role Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative w-64 shadow-inner">
                    <motion.div 
                        animate={{ x: userType === 'tutor' ? 0 : '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-primary rounded-lg shadow-md"
                    />
                    <button 
                        type="button"
                        onClick={() => handleToggle('tutor')} 
                        className={`relative flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'tutor' ? 'text-white' : 'text-slate-500'}`}
                    >
                        Tutor
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleToggle('student')} 
                        className={`relative flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'student' ? 'text-white' : 'text-slate-500'}`}
                    >
                        Student
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={userType}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h1 className="font-bold text-2xl text-primary mb-5">Login As a {userType === 'tutor' ? 'Tutor' : 'Student'}</h1>
                        
                        <form onSubmit={handleSubmit(hadnleLogin)} className="w-full">
                            <fieldset className="fieldset flex flex-col gap-4">
                                
                                {/* Email Field */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Email</label>
                                    <input 
                                        type="email" 
                                        className={`input w-full ${errors.email ? 'border-red-500' : ''}`} 
                                        placeholder="Enter your email" 
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })} 
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold lowercase italic">*{errors.email.message}</p>}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Password</label>
                                    <input 
                                        type="password" 
                                        className={`input w-full ${errors.password ? 'border-red-500' : ''}`} 
                                        placeholder="Enter password" 
                                        {...register("password", { 
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                                        })} 
                                    />
                                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold lowercase italic">*{errors.password.message}</p>}
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <label className="cursor-pointer label p-0 gap-2">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-xs">Remember me</span>
                                    </label>
                                    <span 
                                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                                        onClick={() => toast.success("Feature coming soon!")}
                                    >
                                        Forgot password?
                                    </span>
                                </div>

                                <button type="submit" className="btn btn-primary mt-4 w-full uppercase font-black">
                                    Login
                                </button>
                            </fieldset>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Login;