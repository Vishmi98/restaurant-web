"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { useRouter } from "next/navigation";

import { DUMMY_CART } from "@/constants/data";


const CartPage = () => {
    const [cartItems, setCartItems] = useState(DUMMY_CART);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const updateQuantity = (id: number, type: "inc" | "dec") => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // OPTION A: If you have an API to create a Stripe session
            // const response = await fetch("/api/checkout", {
            //     method: "POST",
            //     body: JSON.stringify({ items: cartItems })
            // });
            // const data = await response.json();
            // window.location.href = data.url;

            // OPTION B: Redirect to your internal Checkout/Address page
            // Simulate a small delay for premium feel
            await new Promise((resolve) => setTimeout(resolve, 800));
            router.push("/cart/checkout");

        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white pt-28 md:pt-35 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-libre font-bold">Your Cart</h1>
                    <Link href="/menu" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors">
                        <BsArrowLeft />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left: Item List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-zinc-900/50 border border-white/30 p-2 rounded-2xl"
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="relative w-24 h-24 md:w-30 md:h-30 overflow-hidden shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg">{item.name}</h3>
                                                <p className="text-zinc-500 text-sm mb-2">{item.category}</p>
                                                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-row items-center gap-4">
                                            <div className="flex items-center border border-zinc-700 rounded-full px-2 py-1 bg-black">
                                                <button onClick={() => updateQuantity(item.id, "dec")} className="p-1 hover:text-primary"><BiMinus /></button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, "inc")} className="p-1 hover:text-primary"><BiPlus /></button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                                            >
                                                <BsTrash size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Right: Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 border border-white/30 p-6 rounded-3xl sticky top-28">
                                <h2 className="text-2xl font-libre font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Delivery Fee</span>
                                        <span className="text-white font-medium">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-zinc-800 my-4" />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className={`w-full bg-primary hover:bg-primary/90 cursor-pointer text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-primary/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <IoBagCheckOutline size={22} />
                                            Checkout Now
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-zinc-500 text-xs mt-6">
                                    Taxes and discounts will be calculated at checkout.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="bg-zinc-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CgShoppingCart size={40} className="text-zinc-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-zinc-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/menu" className="bg-primary px-8 py-3 rounded-full font-bold inline-block">
                            Start Ordering
                        </Link>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default CartPage;