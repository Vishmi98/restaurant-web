"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BsArrowLeft, BsTruck, BsBicycle, BsCreditCard, BsCashStack } from "react-icons/bs";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardInput from "@/modules/cart/ui/CardInput";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPageContent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("delivery"); // delivery or pickup
    const [payment, setPayment] = useState("card"); // card or cash

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            router.push("/cart/checkout/success"); // Create a success page later
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-black text-white pt-28 md:pt-35 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                {/* Header */}
                <div className="mb-10">
                    <Link href="/cart" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors mb-4">
                        <BsArrowLeft />
                        <span>Back to Cart</span>
                    </Link>
                    <h1 className="text-4xl font-libre font-bold">Checkout</h1>
                </div>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Method Selection */}
                        <section className="bg-white/10 border border-white/30 p-4 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm">1</span>
                                Order Method
                            </h2>
                            <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setMethod("delivery")}
                                    className={`flex items-center justify-center gap-3 p-2 md:p-4 rounded-2xl border-2 transition-all ${method === "delivery" ? "border-primary bg-primary/5" : "border-white/30 bg-black hover:border-zinc-700"}`}
                                >
                                    <BsTruck size={20} />
                                    <span className="font-semibold">Delivery</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod("pickup")}
                                    className={`flex items-center justify-center gap-3 p-2 md:p-4 rounded-2xl border-2 transition-all ${method === "pickup" ? "border-primary bg-primary/5" : "border-white/30 bg-black hover:border-zinc-700"}`}
                                >
                                    <BsBicycle size={20} />
                                    <span className="font-semibold">Pickup</span>
                                </button>
                            </div>
                        </section>

                        {/* 2. Delivery/Contact Details */}
                        <section className="bg-white/10 border border-white/30 p-4 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm">2</span>
                                {method === "delivery" ? "Delivery Address" : "Contact Information"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Full Name</label>
                                    <input required type="text" placeholder="John Doe" className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Phone Number</label>
                                    <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" />
                                </div>
                                {method === "delivery" && (
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm text-zinc-400">Street Address</label>
                                        <div className="relative">
                                            <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input required type="text" placeholder="123 Gourmet St, Food City" className="w-full bg-black border border-white/30 rounded-xl pl-10 pr-4 py-3 focus:border-primary outline-none transition-all" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 3. Payment Method */}
                        <section className="bg-white/10 border border-white/30 p-4 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm">3</span>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                {/* CARD OPTION */}
                                <div className="space-y-0">
                                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment === "card" ? "border-primary bg-primary/5" : "border-white/30 bg-black"}`}>
                                        <input type="radio" name="pay" className="hidden" onChange={() => setPayment("card")} checked={payment === "card"} />
                                        <BsCreditCard size={24} className={payment === "card" ? "text-primary" : "text-zinc-500"} />
                                        <div className="flex-1">
                                            <p className="font-bold">Credit / Debit Card</p>
                                            <p className="text-xs text-zinc-500">Secure payment via Stripe</p>
                                        </div>
                                        {payment === "card" && <div className="w-4 h-4 bg-primary rounded-full border-4 border-black" />}
                                    </label>

                                    {/* SHOW CARD INPUT ONLY IF SELECTED */}
                                    {payment === "card" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            className="overflow-hidden"
                                        >
                                            <CardInput />
                                        </motion.div>
                                    )}
                                </div>

                                {/* CASH OPTION */}
                                <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment === "cash" ? "border-primary bg-primary/5" : "border-white/30 bg-black"}`}>
                                    <input type="radio" name="pay" className="hidden" onChange={() => setPayment("cash")} checked={payment === "cash"} />
                                    <BsCashStack size={24} className={payment === "cash" ? "text-primary" : "text-zinc-500"} />
                                    <div className="flex-1">
                                        <p className="font-bold">Cash on Delivery</p>
                                        <p className="text-xs text-zinc-500">Pay when you receive your meal</p>
                                    </div>
                                    {payment === "cash" && <div className="w-4 h-4 bg-primary rounded-full border-4 border-black" />}
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 border border-white/30 p-6 rounded-3xl sticky top-28">
                            <h2 className="text-2xl font-libre font-bold mb-6">Summary</h2>

                            <div className="space-y-3 text-sm text-zinc-400 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white">$30.50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-white">$5.00</span>
                                </div>
                                <div className="flex justify-between text-primary font-bold text-lg pt-4 border-t border-white/30">
                                    <span>Total</span>
                                    <span>$35.50</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-xs text-zinc-500 bg-black p-3 rounded-xl">
                                    <IoTimeOutline size={18} className="text-primary" />
                                    <span>Est. Delivery: 30 - 45 Mins</span>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Confirm & Place Order"
                                )}
                            </button>

                            <p className="text-[10px] text-center text-zinc-600 mt-4 px-4 uppercase tracking-widest">
                                Secured by SSL Encryption
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

const CheckoutPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPageContent />
        </Elements>
    );
};

export default CheckoutPage;