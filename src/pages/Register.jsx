import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import regAnimation from '../assets/register.json';

const Register = () => {
    const [userType, setUserType] = useState('tutor'); // 'tutor' or 'student'

    // Placeholder for your existing functions
    const handleGoogleSignUp = () => {
        console.log("Google Sign Up Triggered");
        // Your logic here
    };

    return (
        <div className="w-full flex items-center justify-center p-2 lg:p-4">
            <div className="max-w-6xl w-full bg-white rounded-4xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-100">
                
                {/* --- LEFT SIDE: ILLUSTRATION --- */}
                <div className="hidden lg:flex lg:w-5/12 bg-slate-50/50 items-center justify-center p-8 border-r border-slate-100">
                    <div className="w-full max-w-sm text-center">
                        <Lottie animationData={regAnimation} loop={true} className="w-64 mx-auto" />
                        <div className="mt-6">
                            <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter">
                                {userType === 'tutor' ? "Teach & Earn" : "Learn & Grow"}
                            </h3>
                            <p className="text-slate-400 mt-2 text-xs font-medium px-4">
                                Join Bangladesh's most reliable platform for private tuitions and academic excellence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: FORM --- */}
                <div className="w-full lg:w-7/12 p-6 md:p-10">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Create Account</h2>
                        <div className="w-12 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Role Toggler */}
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative max-w-70 mx-auto shadow-inner">
                        <motion.div 
                            animate={{ x: userType === 'tutor' ? 0 : '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-orange-600 rounded-lg shadow-md"
                        />
                        <button 
                            type="button"
                            onClick={() => setUserType('tutor')}
                            className={`flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'tutor' ? 'text-white' : 'text-slate-500'}`}
                        >
                            Tutor
                        </button>
                        <button 
                            type="button"
                            onClick={() => setUserType('student')}
                            className={`flex-1 py-2 z-10 font-bold text-xs transition-colors ${userType === 'student' ? 'text-white' : 'text-slate-500'}`}
                        >
                            Student
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {userType === 'tutor' ? (
                            <motion.form 
                                key="tutor-form"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                                <InputField label="Name" placeholder="Full Name" required />
                                <SelectField label="Gender" options={["Male", "Female", "Other"]} required />
                                <InputField label="Email" type="email" placeholder="ex: user@gmail.com" required />
                                <InputField label="Phone" type="tel" placeholder="01xxxxxxxxx" required />
                                <SelectField label="Tuition District" options={["Dhaka", "Chittagong", "Rajshahi"]} required />
                                <SelectField label="Your Location" options={["Select Area"]} required />
                                <div className="md:col-span-2">
                                    <SelectField label="Preferred Tuition Area" options={["Dhanmondi", "Uttara", "Mirpur"]} />
                                </div>
                                <InputField label="Password" type="password" placeholder="Password" required />
                                <InputField label="Re-Password" type="password" placeholder="Confirm" required />
                                <SubmitButton text="Register as Tutor" color="bg-orange-600" />
                            </motion.form>
                        ) : (
                            <motion.form 
                                key="student-form"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                                {/* Google Sign Up Button */}
                                <div className="md:col-span-2 mb-1">
                                    <button 
                                        type="button"
                                        onClick={handleGoogleSignUp}
                                        className="w-full flex items-center justify-center gap-3 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
                                        <span className="text-xs font-bold text-slate-700">Signup with Google</span>
                                    </button>
                                    <div className="relative flex items-center py-3">
                                        <div className="grow border-t border-slate-100"></div>
                                        <span className="shrink mx-3 text-[9px] font-black uppercase tracking-widest text-slate-400">Or Email</span>
                                        <div className="grow border-t border-slate-100"></div>
                                    </div>
                                </div>

                                <InputField label="Name" placeholder="Full Name" required />
                                <InputField label="Phone Number" type="tel" placeholder="01xxxxxxxxx" required />
                                <div className="md:col-span-2">
                                    <InputField label="School/College Name" placeholder="Institution Name" required />
                                </div>
                                <div className="md:col-span-2">
                                    <InputField label="Address" placeholder="Full Address" required />
                                </div>
                                <SelectField label="Class" options={["Class 9", "Class 10", "HSC 1st Year", "HSC 2nd Year"]} required />
                                <InputField label="Email" type="email" placeholder="Email Address" />
                                <InputField label="Password" type="password" placeholder="Password" required />
                                <InputField label="Confirm" type="password" placeholder="Repeat" required />
                                <SubmitButton text="Register as Student" color="bg-slate-900" />
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Form Components ---

const InputField = ({ label, required, ...props }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-slate-600 uppercase tracking-wide ml-1">
            {label} {required && <span className="text-orange-500">*</span>}
        </label>
        <input 
            {...props}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all text-sm"
        />
    </div>
);

const SelectField = ({ label, required, options }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-slate-600 uppercase tracking-wide ml-1">
            {label} {required && <span className="text-orange-500">*</span>}
        </label>
        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all text-sm text-slate-500">
            <option value="">Select</option>
            {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const SubmitButton = ({ text, color }) => (
    <div className="md:col-span-2 mt-2">
        <button className={`w-full py-3.5 ${color} text-white font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95`}>
            {text}
        </button>
        <p className="text-center mt-4 text-[11px] text-slate-400 font-bold uppercase">
            Already have an account? <span className="text-orange-600 cursor-pointer hover:underline">Login</span>
        </p>
    </div>
);

export default Register;