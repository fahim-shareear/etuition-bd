import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login.json';

const Login = () => {
    const [userType, setUserType] = useState('tutor'); // 'tutor' or 'student'

    const handleGoogleLogin = () => {
        console.log("Google Login Triggered");
    };

    return (
        <div className="w-full flex items-center justify-center p-2 lg:p-4">
            <div className="max-w-6xl w-full bg-white rounded-4xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-100">
                
                {/* --- LEFT SIDE: ILLUSTRATION --- */}
                <div className="hidden lg:flex lg:w-5/12 bg-slate-50/50 items-center justify-center p-8 border-r border-slate-100">
                    <div className="w-full max-w-sm text-center">
                        <Lottie animationData={loginAnimation} loop={true} className="w-64 mx-auto" />
                        <div className="mt-6">
                            <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter">
                                {userType === 'tutor' ? "Welcome Back, Instructor" : "Ready to Learn?"}
                            </h3>
                            <p className="text-slate-400 mt-2 text-xs font-medium px-4 leading-relaxed">
                                Log in to access your dashboard, manage your schedule, and connect with your students.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: FORM --- */}
                <div className="w-full lg:w-7/12 p-6 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Login</h2>
                        <div className="w-12 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* --- FIXED ROLE TOGGLER --- */}
                    <div className="w-full max-w-md mx-auto mb-8">
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl relative shadow-inner w-full">
                            {/* Sliding Active Background */}
                            <motion.div 
                                animate={{ x: userType === 'tutor' ? 0 : '100%' }}
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                className="absolute top-1.5 left-1.5 w-[calc(50%-12px)] h-[calc(100%-12px)] bg-orange-600 rounded-xl shadow-lg"
                            />
                            
                            {/* Tutor Button */}
                            <button 
                                type="button"
                                onClick={() => setUserType('tutor')}
                                className={`relative flex-1 py-3 z-10 font-black text-[11px] uppercase tracking-widest transition-colors duration-300 ${userType === 'tutor' ? 'text-white' : 'text-slate-400'}`}
                            >
                                Tutor
                            </button>
                            
                            {/* Student Button */}
                            <button 
                                type="button"
                                onClick={() => setUserType('student')}
                                className={`relative flex-1 py-3 z-10 font-black text-[11px] uppercase tracking-widest transition-colors duration-300 ${userType === 'student' ? 'text-white' : 'text-slate-400'}`}
                            >
                                Student
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {userType === 'tutor' ? (
                            <motion.form 
                                key="tutor-login"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-4 max-w-md mx-auto w-full"
                            >
                                <InputField label="Email Address" type="email" placeholder="tutor@example.com" required />
                                <div className="space-y-1">
                                    <InputField label="Password" type="password" placeholder="••••••••" required />
                                    <div className="text-right">
                                        <button type="button" className="text-[10px] font-bold text-orange-600 cursor-pointer hover:underline uppercase tracking-wider">Forgot Password?</button>
                                    </div>
                                </div>
                                <SubmitButton text="Login as Tutor" color="bg-orange-600" />
                            </motion.form>
                        ) : (
                            <motion.form 
                                key="student-login"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-4 max-w-md mx-auto w-full"
                            >
                                {/* Google Login Button */}
                                <div className="mb-2">
                                    <button 
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                                        <span className="text-xs font-bold text-slate-700">Continue with Google</span>
                                    </button>
                                    
                                    <div className="relative flex items-center py-5">
                                        <div className="grow border-t border-slate-100"></div>
                                        <span className="shrink mx-3 text-[9px] font-black uppercase tracking-widest text-slate-400">Or Email</span>
                                        <div className="grow border-t border-slate-100"></div>
                                    </div>
                                </div>

                                <InputField label="Email Address" type="email" placeholder="student@example.com" required />
                                <InputField label="Password" type="password" placeholder="••••••••" required />
                                
                                <SubmitButton text="Login as Student" color="bg-slate-900" />
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Internal Components ---

const InputField = ({ label, required, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            {label} {required && <span className="text-orange-500">*</span>}
        </label>
        <input 
            {...props}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-medium"
        />
    </div>
);

const SubmitButton = ({ text, color }) => (
    <div className="pt-2">
        <button className={`w-full py-4 ${color} text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:opacity-95 transition-all shadow-xl shadow-orange-500/10 active:scale-95`}>
            {text}
        </button>
        <div className="text-center mt-6">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Don't have an account? <span className="text-orange-600 cursor-pointer hover:underline ml-1">Register Now</span>
            </p>
        </div>
    </div>
);

export default Login;