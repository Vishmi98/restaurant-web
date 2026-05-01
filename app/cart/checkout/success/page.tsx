"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsBagCheck, BsArrowRight } from "react-icons/bs";
import { IoTimerOutline, IoMapOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";


const SuccessPageContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center pt-28 md:pt-35 pb-12">
            <div className="max-w-3xl w-full px-6">
                <div className="bg-white/10 border border-white/30 rounded-3xl md:rounded-[40px] p-5 md:p-14 text-center relative overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />

                    {/* Animated Check Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-lg shadow-primary/30"
                    >
                        <BsCheck2Circle size={50} className="text-white" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-libre font-bold mb-4">
                            Order Confirmed!
                        </h1>
                        <p className="text-muted text-base md:text-lg mb-5 max-w-md mx-auto">
                            Thank you for your order. We’ve received it and our chefs are already preparing your meal.
                        </p>
                    </motion.div>

                    {/* Order Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-black/20 border border-white/30 p-2 md:p-4 rounded-xl md:rounded-3xl flex items-center gap-4 text-left"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-lg md:rounded-2xl flex items-center justify-center text-primary">
                                <IoTimerOutline size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted uppercase tracking-widest font-bold">Estimated Delivery</p>
                                <p className="font-bold text-base md:text-lg">25 - 35 Mins</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-black/20 border border-white/30 p-2 md:p-4 rounded-xl md:rounded-3xl flex items-center gap-4 text-left"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-lg md:rounded-2xl flex items-center justify-center text-primary">
                                <BsBagCheck size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted uppercase tracking-widest font-bold">Order ID</p>
                                <p className="font-bold text-base md:text-lg">#RF-82910</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={`/track/${orderId}`}
                            className="w-full md:w-[40%] bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all group"
                        >
                            <IoMapOutline size={20} />
                            Track Order
                            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/menu"
                            className="w-full md:w-[40%] bg-white/10 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-full transition-all"
                        >
                            Back to Menu
                        </Link>
                    </div>
                </div>

                <p className="text-center text-zinc-600 text-sm mt-8">
                    A confirmation email has been sent to your registered address.
                </p>
            </div>
        </main>
    );
};

const SuccessPage = () => {
    return (
        // Wrap the client-side content with Suspense
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    );
}

export default SuccessPage;