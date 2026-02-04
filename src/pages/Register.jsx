import React, { useState } from 'react';
import registeranimation from '../assets/register.json';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion'; 
import useAuth from '../hooks/useAuth';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router';

const Register = () => {
    // errors অবজেক্টটি নিয়ে আসা হয়েছে
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { signInWithGoogle, createUserWithEmail } = useAuth();
    const [userType, setUserType] = useState('tutor');
    const location = useNavigate();

    const handleTypeSwitch = (type) => {
        setUserType(type);
        reset(); 
    };

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                location('/')
            })
            .catch((error) => {
                if (error) return;
                toast.error(error.message);
            });
    };
    
    const hadnleRegistration = (data) => {
        createUserWithEmail(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                location('/')
            })
            .catch((error) => {
                if (error) return;
                toast.error(error.message);
            })
    }

    // এরর মেসেজের জন্য একটি ছোট কম্পোনেন্ট (কোড ক্লিন রাখার জন্য)
    const ErrorMsg = ({ name }) => (
        errors[name] ? <p className="text-red-500 text-[10px] mt-1 font-bold lowercase italic">*{errors[name].message || "This field is required"}</p> : null
    );

    return (
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-white/20 max-w-md lg:max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-10">
            
            <div className="md:w-1/2 flex justify-center sticky top-0">
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
                                        <button type="button" onClick={handleGoogleRegister} className="btn btn-outline w-full flex items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold">
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

                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Full Name</label>
                                    <input type="text" className={`input w-full ${errors.name ? 'border-red-500' : ''}`} placeholder="Your Name" {...register("name", {required: "Name is required"})} />
                                    <ErrorMsg name="name" />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Email</label>
                                    <input type="email" className={`input w-full ${errors.email ? 'border-red-500' : ''}`} placeholder="Email" {...register("email", {required: "Email is required"})} />
                                    <ErrorMsg name="email" />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Phone</label>
                                    <input type="tel" className={`input w-full ${errors.phone ? 'border-red-500' : ''}`} placeholder="Phone Number" {...register("phone", {required: "Phone number is required"})} />
                                    <ErrorMsg name="phone" />
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="label font-bold text-xs uppercase tracking-wide">Address</label>
                                    <input type="text" className={`input w-full ${errors.address ? 'border-red-500' : ''}`} placeholder="Address" {...register("address", {required: "Address is required"})} />
                                    <ErrorMsg name="address" />
                                </div>

                                {userType === 'tutor' ? (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Occupation</label>
                                            <select className={`select select-bordered w-full ${errors.occupation ? 'border-red-500' : ''}`} {...register("occupation", {required: "Please select occupation"})}>
                                                <option value="">Pick one</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="student">Student</option>
                                            </select>
                                            <ErrorMsg name="occupation" />
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institution Name</label>
                                            <input type="text" className={`input w-full ${errors.institution ? 'border-red-500' : ''}`} placeholder="Institution Name" {...register("institution", {required: "Institution is required"})} />
                                            <ErrorMsg name="institution" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Institutions Name</label>
                                            <input type="text" className={`input w-full ${errors.institution ? 'border-red-500' : ''}`} placeholder="Institution Name" {...register("institution", {required: "Institution is required"})} />
                                            <ErrorMsg name="institution" />
                                        </div>
                                        <div>
                                            <label className="label font-bold text-xs uppercase tracking-wide">Class</label>
                                            <select className={`select select-bordered w-full ${errors.class ? 'border-red-500' : ''}`} {...register("class", {required: "Class is required"})}>
                                                <option value="">Pick one</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                                <option value="11">H.S.C</option>
                                            </select>
                                            <ErrorMsg name="class" />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Gender</label>
                                    <select className={`select select-bordered w-full ${errors.gender ? 'border-red-500' : ''}`} {...register("gender", {required: "Gender is required"})}>
                                        <option value="">Pick one</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <ErrorMsg name="gender" />
                                </div>

                                <div className="md:col-span-1 hidden md:block"></div> 

                                {/* Password */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Password</label>
                                    <input type="password" className={`input w-full ${errors.password ? 'border-red-500' : ''}`} placeholder="Password" {...register("password", {required: "Password is required", minLength: {value: 6, message: "Min 6 characters"}})} />
                                    <ErrorMsg name="password" />
                                </div>

                                {/* Re Password with Matching Validation */}
                                <div>
                                    <label className="label font-bold text-xs uppercase tracking-wide">Re Password</label>
                                    <input type="password" className={`input w-full ${errors.repassword ? 'border-red-500' : ''}`} placeholder="Confirm Password" 
                                    {...register("repassword", {
                                        required: "Confirm your password",
                                        validate: (val) => {
                                            if (watch('password') !== val) {
                                              return "Your passwords do not match";
                                            }
                                          },
                                    })} />
                                    <ErrorMsg name="repassword" />
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