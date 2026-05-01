"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeft, BsTrash, BsX } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import useCartStore from "@/store/cartStore";
import { getCookieUser } from "@/utils/cookie.util";


const CartPage = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const router = useRouter();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + deliveryFee;
    const user = getCookieUser()

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        if (!user) {
            setOpenLoginModal(true);
            return;
        }

        setIsLoading(true);

        try {
            // Simulate processing
            await new Promise((resolve) => setTimeout(resolve, 800));
            router.push("/cart/checkout");
        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen bg-black text-white pt-28 md:pt-35 pb-16">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-4xl font-bold">Your Cart</h1>
                            <p className="text-muted mt-2">{cart.length} items in your bag</p>
                        </div>
                        <Link href="/menu" className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
                            <BsArrowLeft />
                            <span>Back to Menu</span>
                        </Link>
                    </div>

                    {cart.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                            {/* Left: Item List */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            className="flex flex-col md:flex-row items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors"
                                        >
                                            <div className="flex w-full items-center gap-4">
                                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                    <Image
                                                        src={item.image || "/placeholder-dish.jpg"}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            {/* Controls Row */}
                                            <div className="flex items-center justify-between w-full md:w-auto gap-6">
                                                <div className="flex items-center border border-zinc-800 rounded-full p-1 bg-black/50">
                                                    {/* Note: Logic here handles decrementing via your store functions */}
                                                    <button
                                                        onClick={() => removeFromCart(item.id)} // or a specific dec function
                                                        className="p-2 hover:text-primary transition-colors"
                                                    >
                                                        <BiMinus />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="p-2 hover:text-primary transition-colors"
                                                    >
                                                        <BiPlus />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                                                    title="Remove Item"
                                                >
                                                    <BsTrash size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                <button
                                    onClick={clearCart}
                                    className="text-muted hover:text-red-500 text-xs uppercase tracking-widest transition-colors pt-4 px-2"
                                >
                                    Clear All Items
                                </button>
                            </div>

                            {/* Right: Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl sticky top-28 shadow-2xl">
                                    <h2 className="text-xl font-bold mb-6">Summary</h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-muted">
                                            <span>Subtotal</span>
                                            <span className="text-white">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted">
                                            <span>Delivery Fee</span>
                                            <span className="text-white">${deliveryFee.toFixed(2)}</span>
                                        </div>
                                        <div className="h-px bg-white/5 my-4" />
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={isLoading}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <HiOutlineShoppingBag size={20} />
                                                Go to Checkout
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted uppercase tracking-widest">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        Secure SSL Checkout
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-24 bg-zinc-900/20 border border-dashed border-white/10 rounded-3xl"
                        >
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                                <HiOutlineShoppingBag size={32} className="text-zinc-700" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Empty Bag</h2>
                            <p className="text-muted mb-8 max-w-xs text-center">Your cart is currently empty. Explore our menu to find something delicious.</p>
                            <Link
                                href="/menu"
                                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
                            >
                                Explore Menu
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>
            {/* LOGIN MODAL */}
            <AnimatePresence>
                {openLoginModal && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
                    >
                        <motion.div
                            initial={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            className="w-full max-w-md bg-white/10 border border-white/30 rounded-3xl p-8 relative"
                        >
                            <button
                                onClick={() =>
                                    setOpenLoginModal(
                                        false
                                    )
                                }
                                className="absolute top-4 right-4 text-muted hover:text-white"
                            >
                                <BsX size={22} />
                            </button>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-5">
                                    <HiOutlineShoppingBag size={28} />
                                </div>

                                <h2 className="text-2xl font-bold mb-3 text-white">
                                    Login Required
                                </h2>

                                <p className="text-muted mb-8">
                                    Please login to continue
                                    your checkout.
                                </p>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/login"
                                        )
                                    }
                                    className="w-full bg-primary  cursor-pointer hover:bg-primary/90 text-white font-bold py-4 rounded-full transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CartPage;