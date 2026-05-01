// checkout page
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    BsArrowLeft,
    BsTruck,
    BsBicycle,
    BsCreditCard,
    BsCashStack,
} from "react-icons/bs";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

import CardInput from "@/modules/cart/ui/CardInput";
import useCartStore from "@/store/cartStore";
import { getCookieUser } from "@/utils/cookie.util";
import { createOrder } from "@/modules/cart/cart.service";
import { OrderType } from "@/modules/cart/cart.types";

const stripePromise = loadStripe("pk_test_51placeholder12345");

const CheckoutPageContent = () => {
    const router = useRouter();

    const { cart, clearCart } = useCartStore();
    const user = getCookieUser();

    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("delivery");
    const [payment, setPayment] = useState("cash");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        note: "",
    });

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const deliveryFee =
        method === "delivery" && cart.length > 0 ? 5 : 0;

    const total = subtotal + deliveryFee;

    const handlePlaceOrder = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        if (
            method === "delivery" &&
            !form.address
        ) {
            toast.error(
                "Please enter delivery address"
            );
            return;
        }

        setLoading(true);

        try {
            const userId = user && user.id ? Number(user.id) : 0;

            const payload: OrderType = {
                customer: {
                    id: userId,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address:
                        method ===
                            "delivery"
                            ? form.address
                            : "Pickup Order",
                },

                items: cart.map(
                    (item) => ({
                        dishId: Number(
                            item.id
                        ),
                        quantity:
                            item.quantity,
                    })
                ),

                paymentMethod:
                    payment ===
                        "cash"
                        ? "Cash"
                        : "Card",

                note: form.note,
            };

            const res = await createOrder(payload);

            if (res.success) {
                clearCart();

                toast.success("Order created successfully");

                // ✅ PASS ORDER ID
                router.push(`/cart/checkout/success?orderId=${res.order.id}`);
            } else {
                toast.error(
                    "Failed to create order"
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/cart"
                        className="flex items-center gap-2 text-zinc-400 hover:text-primary mb-4"
                    >
                        <BsArrowLeft />
                        Back to Cart
                    </Link>

                    <h1 className="text-4xl font-libre font-bold">Checkout</h1>
                </div>

                <form
                    onSubmit={
                        handlePlaceOrder
                    }
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Method */}
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

                                {/* <button
                                    type="button"
                                    onClick={() => setMethod("pickup")}
                                    className={`flex items-center justify-center gap-3 p-2 md:p-4 rounded-2xl border-2 transition-all ${method === "pickup" ? "border-primary bg-primary/5" : "border-white/30 bg-black hover:border-zinc-700"}`}
                                >
                                    <BsBicycle size={20} />
                                    <span className="font-semibold">Pickup</span>
                                </button> */}
                            </div>
                        </section>

                        {/* Customer */}

                        <section className="bg-white/10 border border-white/30 p-4 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm">2</span>
                                {method === "delivery" ? "Delivery Address" : "Contact Information"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Full Name</label>
                                    <input
                                        required
                                        placeholder="John Doe"
                                        value={
                                            form.name
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setForm(
                                                {
                                                    ...form,
                                                    name: e
                                                        .target
                                                        .value,
                                                }
                                            )
                                        }
                                        className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="john@gmail.com"
                                        value={
                                            form.email
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setForm(
                                                {
                                                    ...form,
                                                    email: e
                                                        .target
                                                        .value,
                                                }
                                            )
                                        }
                                        className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Phone Number</label>
                                    <input
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        value={
                                            form.phone
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setForm(
                                                {
                                                    ...form,
                                                    phone: e
                                                        .target
                                                        .value,
                                                }
                                            )
                                        }
                                        className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                {method ===
                                    "delivery" && (
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Street Address</label>
                                            <div className="relative">
                                                <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                                                <input
                                                    required
                                                    placeholder="123 Gourmet St, Food City"
                                                    value={
                                                        form.address
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setForm(
                                                            {
                                                                ...form,
                                                                address:
                                                                    e
                                                                        .target
                                                                        .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-full bg-black border border-white/30 rounded-xl pl-10 pr-4 py-3 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    )}

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-zinc-400">Order Note</label>
                                    <textarea
                                        placeholder="Order Note"
                                        value={
                                            form.note
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setForm(
                                                {
                                                    ...form,
                                                    note: e
                                                        .target
                                                        .value,
                                                }
                                            )
                                        }
                                        className="w-full bg-black border border-white/30 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="bg-white/10 border border-white/30 p-4 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm">3</span>
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPayment(
                                            "cash"
                                        )
                                    }
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border ${payment ===
                                        "cash"
                                        ? "border-primary"
                                        : "border-white/20"
                                        }`}
                                >
                                    <BsCashStack />
                                    Cash
                                </button>

                                {/* <button
                                    type="button"
                                    onClick={() =>
                                        setPayment(
                                            "card"
                                        )
                                    }
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border ${payment ===
                                        "card"
                                        ? "border-primary"
                                        : "border-white/20"
                                        }`}
                                >
                                    <BsCreditCard />
                                    Card
                                </button> */}

                                {payment ===
                                    "card" && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                        >
                                            <CardInput />
                                        </motion.div>
                                    )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 border border-white/30 p-6 rounded-3xl sticky top-28">
                            <h2 className="text-2xl font-libre font-bold mb-6">Summary</h2>

                            <div className="space-y-3 text-sm text-zinc-400 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>

                                    <span>
                                        $
                                        {subtotal.toFixed(
                                            2
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>

                                    <span>
                                        $
                                        {deliveryFee.toFixed(
                                            2
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between text-primary font-bold text-lg pt-4 border-t border-white/30">
                                    <span>
                                        Total
                                    </span>
                                    <span>
                                        $
                                        {total.toFixed(
                                            2
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-xs text-zinc-500 bg-black p-3 rounded-xl">
                                    <IoTimeOutline size={18} className="text-primary" />
                                    <span>Est. Delivery: 30 - 45 Mins</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Confirm & Place Order"
                                )}

                            </button>
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