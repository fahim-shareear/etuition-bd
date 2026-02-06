import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router";

const CheckoutForm = ({ appId, salary, tutorEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");

    useEffect(() => {
        // FIX: Handle cases where salary might be a string like "$2000" or "Negotiable"
        let cleanSalary = salary;
        
        if (typeof salary === 'string') {
            cleanSalary = salary.replace(/[$,]/g, ''); // Remove $ or commas
        }
        
        const amount = parseFloat(cleanSalary);

        // If salary is still NaN (like "Negotiable"), the intent won't fire.
        if (!isNaN(amount) && amount > 0) {
            axios.post("http://localhost:3000/create-payment-intent", { salary: amount })
                .then(res => {
                    console.log("Success: Client Secret Received", res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Backend Error:", err.response?.data || err.message);
                });
        } else {
            console.error("Payment Blocked: Salary is not a valid number:", salary);
        }
    }, [salary]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret || processing) {
            return;
        }

        setProcessing(true);
        const card = elements.getElement(CardElement);

        if (card === null) {
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { 
                    email: user?.email || 'anonymous', 
                    name: user?.displayName || 'anonymous' 
                }
            }
        });

        if (confirmError) {
            setCardError(confirmError.message);
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: confirmError.message,
                confirmButtonColor: '#ea580c'
            });
            setProcessing(false);
        } else {
            setCardError("");
            if (paymentIntent.status === "succeeded") {
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    studentEmail: user.email,
                    tutorEmail,
                    salary: parseFloat(salary.toString().replace(/[$,]/g, '')),
                    appId,
                    status: "paid",
                    date: new Date()
                };

                try {
                    const res = await axios.post("http://localhost:3000/payments", paymentInfo);
                    if (res.data.paymentResult.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            text: `Transaction ID: ${paymentIntent.id}`,
                            confirmButtonColor: '#ea580c',
                            background: '#fff',
                            customClass: { popup: 'rounded-3xl' }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/dashboard/applied-tutors');
                            }
                        });
                    }
                } catch (dbError) {
                    console.error("Database save error:", dbError);
                    setProcessing(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#1e293b',
                                '::placeholder': { color: '#94a3b8' },
                            },
                            invalid: { color: '#ef4444' },
                        },
                    }}
                    onChange={() => setCardError("")}
                />
            </div>
            
            {cardError && <p className="text-red-500 text-xs font-bold px-2 italic">{cardError}</p>}

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className={`btn btn-primary w-full h-12 bg-orange-600 hover:bg-orange-700 border-none text-white font-black uppercase italic tracking-widest rounded-2xl shadow-lg transition-all ${(!stripe || !clientSecret || processing) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {processing ? (
                    <div className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs"></span>
                        Processing...
                    </div>
                ) : (
                    `Confirm Payment $${salary}`
                )}
            </button>
            
            {!clientSecret && !processing && (
                <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Initializing secure connection...
                    </p>
                    {isNaN(parseFloat(salary)) && (
                        <p className="text-[10px] text-red-500 font-bold">
                            Error: Salary must be a number to enable payment.
                        </p>
                    )}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;