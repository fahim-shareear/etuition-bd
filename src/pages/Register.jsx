import React, { useState } from 'react';
import registeranimation from '../assets/register.json';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion'; 

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [userType, setUserType] = useState('tutor');

    const handleTypeSwitch = (type) => {
        setUserType(type);
        reset(); 
    };

    // গুগল দিয়ে রেজিস্ট্রেশন করার হ্যান্ডলার
    const handleGoogleRegister = () => {
        console.log("Google registration processing...");
        // আপনার গুগল লগইন লজিক এখানে লিখুন
    };
    
    const hadnleRegistration = (data) => {
        console.log("after registration", data);
    }

    return (
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-white/20 max-w-md lg:max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-10">
            
            {/* Left Side: Animation */}
            <div className="md:w-1/2 flex justify-center sticky top-0">
                <div className="w-full max-w-sm">
                    <Lottie animationData={registeranimation} loop={true} />
                </div>
            </div>

            {/* Right Side: Form Content */}
            <div className="md:w-1/2 w-full">
                {/* টগল বাটন */}
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
                                
                                {/* যদি স্টুডেন্ট হয় তবে গুগল বাটন দেখাবে */}
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

                                {/* ইনপুট ফিল্ডস */}
                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Full Name</label>
                                    <input type="text" className="input w-full" placeholder="Your Name" {...register("name", {required: true})} />
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Email</label>
                                    <input type="email" className="input w-full" placeholder="Email" {...register("email", {required: true})} />
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Phone</label>
                                    <input type="tel" className="input w-full" placeholder="Phone Number" {...register("phone", {required: true})} />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Address</label>
                                    <input type="text" className="input w-full" placeholder="Address" {...register("address", {required: true})} />
                                </div>

                                {userType === 'tutor' ? (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Occupation</label>
                                            <select className="select select-bordered w-full" {...register("occupation", {required: true})}>
                                                <option disabled selected value="">Pick one</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="student">Student</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institution Name</label>
                                            <input type="text" className="input w-full" placeholder="Institution Name" {...register("institution", {required: true})} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institutions Name</label>
                                            <input type="text" className="input w-full" placeholder="Institution Name" {...register("institution", {required: true})} />
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Class</label>
                                            <select className="select select-bordered w-full" {...register("class", {required: true})}>
                                                <option disabled selected value="">Pick one</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                                <option value="11">H.S.C</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Gender</label>
                                    <select className="select select-bordered w-full" {...register("gender", {required: true})}>
                                        <option disabled selected value="">Pick one</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="md:col-span-1 hidden md:block"></div> 

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Password</label>
                                    <input type="password" className="input w-full" placeholder="Password" {...register("password", {required: true})} />
                                </div>

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Re Password</label>
                                    <input type="password" className="input w-full" placeholder="Confirm Password" {...register("repassword", {required: true})} />
                                </div>

                                <button className="btn btn-primary mt-6 md:col-span-2 w-full uppercase font-black">Submit & Register</button>
                            </fieldset>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Register;