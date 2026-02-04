import React, { useState } from 'react';
import loginanimation from "../assets/Login.json";
import Lottie from 'lottie-react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
    const { signInWithEmail, signInWithGoogle } = useAuth(); // signInWithGoogle নিয়ে আসা হয়েছে
    const [eye, setEye] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userType, setUserType] = useState("tutor");
    const location = useLocation();

    const hadnleLogin = (data) => {
        const toastId = toast.loading("Logging in...");
        signInWithEmail(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                toast.success("Login Successful!", { id: toastId });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error(error.message || "Login failed.", { id: toastId });
                return;
            });
    };

    // গুগল লগইন হ্যান্ডলার ফাংশন
    const handleGoogleLogin = () => {
        const toastId = toast.loading("Connecting with Google...");
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                toast.success("Google Login Successful!", { id: toastId });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error(error.message || "Google Login failed.", { id: toastId });
                return
            });
    };

    const handleToggle = (type) => {
        setUserType(type);
        reset();
    };

    const handleEye = () => {
        setEye(!eye);
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
                                
                                {/* গুগল লগইন বাটন (শুধুমাত্র স্টুডেন্টদের জন্য) */}
                                {userType === 'student' && (
                                    <div className="space-y-4 mb-2">
                                        <button 
                                            type="button"
                                            onClick={handleGoogleLogin}
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
                                    <div className="relative">
                                        <input 
                                            type={eye ? "text" : "password"} 
                                            className={`input w-full pr-10 ${errors.password ? 'border-red-500' : ''}`} 
                                            placeholder="Enter password" 
                                            {...register("password", { 
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Min 6 characters" }
                                            })} 
                                        />
                                        <button 
                                            type="button"
                                            onClick={handleEye}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                                        >
                                            {eye ? <IoMdEyeOff /> : <IoEye />}
                                        </button>
                                    </div>
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
                        <div>
                            <p>Don't have and Account Please <NavLink to="/register" state={location.state}><span className="text-primary font-bold text-[15px]">Register</span></NavLink></p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Login;