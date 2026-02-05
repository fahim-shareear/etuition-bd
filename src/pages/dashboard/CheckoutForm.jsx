import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CheckoutForm = ({ appId, salary, tutorEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (salary > 0) {
            axios.post("http://localhost:3000/create-payment-intent", { salary })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => console.error("Payment intent error:", err));
        }
    }, [salary]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || processing) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);

        if (card === null) return;

        // পেমেন্ট কনফার্ম করা
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { email: user?.email || 'anonymous', name: user?.displayName || 'anonymous' }
            }
        });

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === "succeeded") {
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    studentEmail: user.email,
                    tutorEmail,
                    salary,
                    appId,
                    status: "paid",
                    date: new Date()
                };

                // ডাটাবেজে রেকর্ড সেভ করা
                const res = await axios.post("http://localhost:3000/payments", paymentInfo);
                if (res.data.paymentResult.insertedId) {
                    toast.success(`Payment Successful! TRX: ${paymentIntent.id}`);
                    navigate('/dashboard/applied-tutors'); // সাকসেস হলে ফেরত পাঠানো
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full bg-orange-600 hover:bg-orange-700 border-none text-white font-bold"
            >
                {processing ? <span className="loading loading-spinner loading-sm"></span> : `Pay $${salary}`}
            </button>
        </form>
    );
};

export default CheckoutForm;