import React /* , { useEffect, useState } */ from 'react';
import { motion } from 'framer-motion';
// import { axiosPublic } from '../../api/axiosPublic';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { FaMapMarkerAlt, FaGraduationCap, FaClock } from "react-icons/fa";

const HomeDynamicSections = () => {
    /* const [tuitions, setTuitions] = useState([]);
    useEffect(() => {
        axiosPublic.get('/latest-tuitions').then(res => setTuitions(res.data));
    }, []); 
    */

    // Hardcoded Data
    const dummyTuitions = [
        { id: 1, title: "Math & Physics Tutor", location: "Dhanmondi, Dhaka", class: "Class 10", medium: "English Medium", salary: "8000" },
        { id: 2, title: "English Version Tutor", location: "Banani, Dhaka", class: "Class 8", medium: "English Version", salary: "6000" },
        { id: 3, title: "ICT Specialist", location: "Mirpur, Dhaka", class: "HSC", medium: "Bangla Medium", salary: "5000" },
        { id: 4, title: "Chemistry Instructor", location: "Uttara, Dhaka", class: "A Levels", medium: "English Medium", salary: "12000" },
        { id: 5, title: "Primary Subject Tutor", location: "Gulshan, Dhaka", class: "Class 3", medium: "English Medium", salary: "4500" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    Latest <span className="text-orange-600">Tuition</span> Posts
                </h2>
                <div className="h-1.5 w-20 bg-orange-500 mt-2 rounded-full"></div>
            </motion.div>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-14" // Space for pagination dots
            >
                {/* When you fetch data, replace dummyTuitions with your state variable */}
                {dummyTuitions.map((job) => (
                    <SwiperSlide key={job.id}>
                        <motion.div 
                            whileHover={{ scale: 0.98 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md border border-orange-100 uppercase">
                                        {job.medium}
                                    </span>
                                    <span className="text-lg font-bold text-slate-800">
                                        {job.salary} <span className="text-xs font-normal text-slate-400 font-mono">BDT</span>
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight">
                                    {job.title}
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                        <FaMapMarkerAlt className="text-orange-500" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                        <FaGraduationCap className="text-orange-500" />
                                        <span>{job.class}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
                                    <FaClock />
                                    <span>Just Posted</span>
                                </div>
                                <button className="text-orange-600 font-bold text-sm hover:underline">
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HomeDynamicSections;