import axios from 'axios';
import { useMemo, useContext } from 'react'; // useContext ব্যবহার করা হয়েছে
import { AuthContext } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom'; // লগআউটের পর রিডাইরেক্ট করার জন্য

const useAxios = () => {
    const { user, logOut } = useContext(AuthContext); // logOut ফাংশনটি নিয়ে আসা হয়েছে
    const navigate = useNavigate();

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:3000/',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // --- REQUEST INTERCEPTOR: টোকেন পাঠানো ---
        instance.interceptors.request.use(
            async (config) => {
                if (user) {
                    // Firebase থেকে একদম লেটেস্ট টোকেন নিয়ে পাঠানো হচ্ছে
                    const token = await user.getIdToken(); 
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // --- RESPONSE INTERCEPTOR: এরর হ্যান্ডলিং ---
        instance.interceptors.response.use(
            (response) => response, // যদি রেসপন্স ঠিক থাকে তবে তা রিটার্ন করবে
            async (error) => {
                const status = error.response ? error.response.status : null;

                // যদি টোকেন ইনভ্যালিড (401) বা এক্সেস ডিনাইড (403) হয়
                if (status === 401 || status === 403) {
                    console.log("Unauthorized/Forbidden access. Logging out...");
                    
                    // ইউজারকে লগআউট করানো
                    await logOut();
                    
                    // লগইন পেজে পাঠিয়ে দেওয়া
                    navigate('/login');
                }
                
                return Promise.reject(error);
            }
        );

        return instance;
    }, [user, logOut, navigate]);

    return axiosInstance;
};

export default useAxios;