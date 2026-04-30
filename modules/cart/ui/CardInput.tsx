"use client"

import { CardElement } from "@stripe/react-stripe-js";


const CardInput = () => {
    return (
        <div className="space-y-4 mt-4 animate-in fade-in duration-500">
            <div className="space-y-2">
                <label className="text-sm text-zinc-400">Card Details</label>
                <div className="p-4 bg-black border border-white/30 rounded-xl focus-within:border-primary transition-all">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#ffffff",
                                    "::placeholder": { color: "#71717a" },
                                },
                                invalid: { color: "#ef4444" },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardInput;