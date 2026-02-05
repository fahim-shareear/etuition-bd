import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";

// আপনার ড্যাশবোর্ড থেকে পাবলিশেবল কি এখানে বসান
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const location = useLocation();
    const { appId, salary, tutorEmail } = location.state || {};

    if (!appId) return <div className="p-10 text-red-500 font-bold">Invalid Application. Go back.</div>;

    return (
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-2xl mt-10">
            <h2 className="text-3xl font-black mb-2 text-slate-800 italic uppercase">Payment</h2>
            <p className="text-slate-500 mb-8 font-medium">Accepting tutor for <span className="text-orange-600 font-bold">${salary}</span></p>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm appId={appId} salary={salary} tutorEmail={tutorEmail} />
            </Elements>
        </div>
    );
};

export default Payment;