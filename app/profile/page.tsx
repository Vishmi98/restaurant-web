"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    HiArrowLeft,
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineShoppingBag,
    HiOutlineArrowRightOnRectangle,
    HiOutlineClock,
} from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import Image from "next/image";

import { handleCleanCookie } from "@/utils/cookie.util";
import userStore from "@/store/userStore";
import { UserDataType } from "@/modules/profile/profile.types";
import { getUserProfileData } from "@/modules/profile/profile.service";
import ProfileSkeleton from "@/modules/profile/ui/ProfileSkeleton";
import { OrderDataType } from "@/modules/cart/cart.types";
import { getOrderByUserId } from "@/modules/cart/cart.service";


const ProfilePage = () => {
    const router = useRouter();
    const { removeUser } = userStore();
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [orders, setOrders] = useState<OrderDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                // 1. Fetch User Profile
                const profileRes = await getUserProfileData();

                if (profileRes.success && profileRes.user) {
                    setUserData(profileRes.user);

                    // 2. Fetch Orders using the user ID from the profile response
                    const orderRes = await getOrderByUserId({
                        customerId: profileRes.user.id
                    });

                    if (orderRes.success && orderRes.orders) {
                        setOrders(orderRes.orders);
                    }
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error("Data fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [router]);

    const handleLogOut = () => {
        handleCleanCookie();
        removeUser(); // Clear Zustand store
        window.location.href = '/';
    }

    // Skeleton Component
    if (isLoading) return <ProfileSkeleton />;

    return (
        <main className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="relative  border border-white/20 rounded-3xl p-5 md:p-8 mb-8">
                    <div className="absolute inset-0">
                        <Image
                            src="/4.png"
                            alt="background"
                            fill
                            className="object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-black/75 rounded-3xl" />
                    </div>
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Avatar Container */}
                            <div className="relative group">
                                <div className="md:w-20 md:h-20 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center text-2xl md:text-3xl font-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] ring-4 ring-black border-2 border-white/10 transition-transform duration-300 group-hover:scale-105">
                                    {userData?.firstName ? (
                                        `${userData.firstName.charAt(0)}${userData.lastName?.charAt(0) || ""}`.toUpperCase()
                                    ) : (
                                        <AiOutlineUser className="w-8 h-8 md:w-10 md:h-10" />
                                    )}
                                </div>
                                {/* Optional: Online Status Indicator */}
                                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></span>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col">
                                <h1 className="text-2xl md:text-4xl font-extrabold font-libre tracking-tight text-white leading-tight">
                                    {userData?.firstName} {userData?.lastName}
                                </h1>

                                <div className="flex items-center gap-2 mt-1 md:mt-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    <p className="text-muted text-sm md:text-base font-medium uppercase tracking-widest">
                                        Account Dashboard
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogOut}
                            className="px-5 py-3 rounded-full bg-primary text-black font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Info */}
                        <section className="bg-white/10 border border-white/20 rounded-3xl p-5">
                            <h2 className="text-2xl font-bold mb-6">
                                Personal Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="bg-black/40 rounded-2xl p-3">
                                    <p className="text-muted text-sm mb-2">
                                        Full Name
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <HiOutlineUser className="text-primary w-5 h-5" />
                                        <span>
                                            {userData?.firstName} {" "} {userData?.lastName}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-2xl p-3">
                                    <p className="text-muted text-sm mb-2">
                                        Email
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <HiOutlineEnvelope className="text-primary w-5 h-5" />
                                        <span>{userData?.email}</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-2xl p-3">
                                    <p className="text-muted text-sm mb-2">
                                        Phone
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <HiOutlinePhone className="text-primary w-5 h-5" />
                                        <span>{userData?.phone}</span>
                                    </div>
                                </div>

                                {/* <div className="bg-black/40 rounded-2xl p-3">
                                    <p className="text-muted text-sm mb-2">
                                        Address
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <HiOutlineMapPin className="text-primary w-5 h-5" />
                                        <span>{userData?.address}</span>
                                    </div>
                                </div> */}
                            </div>
                        </section>

                        {/* Recent Orders */}
                        <section className="bg-white/10 border border-white/20 rounded-3xl p-5">
                            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                            <div className="space-y-4">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <div key={order.id} className="flex flex-row md:items-center justify-between gap-4 bg-black/40 rounded-2xl p-3">
                                            <div>
                                                <p className="font-semibold text-lg">Order #{order.id}</p>
                                                <p className="text-muted text-sm">
                                                    {order.items.length} Items • {order.paymentMethod}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs md:text-sm ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <Link href={`/track/${order.id}`} className="text-white hover:text-primary transition">
                                                    <BsEye size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted text-center py-4 flex items-center justify-center">
                                        <Image
                                            src="/10.png"
                                            alt="No order"
                                            width={70}
                                            height={70}
                                        />
                                        No orders found.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <section className="bg-white/10 border border-white/20 rounded-3xl p-5">
                            <h2 className="text-xl font-bold mb-5">
                                Quick Actions
                            </h2>

                            <div className="space-y-3">
                                <Link
                                    href="/menu"
                                    className="w-full flex items-center justify-between bg-black/40 hover:bg-primary/10 border border-white/10 rounded-2xl px-4 py-4 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <HiOutlineShoppingBag className="w-5 h-5 text-primary" />
                                        <span>Order Food</span>
                                    </div>
                                    <HiArrowLeft className="rotate-180 w-5 h-5" />
                                </Link>

                                <Link
                                    href={`/track/${orders.length > 0 ? orders[0].id : 1}`}
                                    className="w-full flex items-center justify-between bg-black/40 hover:bg-primary/10 border border-white/10 rounded-2xl px-4 py-4 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <HiOutlineClock className="w-5 h-5 text-primary" />
                                        <span>Track Order</span>
                                    </div>
                                    <HiArrowLeft className="rotate-180 w-5 h-5" />
                                </Link>
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="bg-primary/10 border border-primary/20 rounded-3xl p-5">
                            <h2 className="text-xl font-bold mb-5 text-primary">
                                Account Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted">
                                        Total Orders
                                    </span>
                                    <span className="font-bold">{orders.length}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted">
                                        Member Since
                                    </span>
                                    <span className="font-bold">2026</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted">Loyalty Points</span>
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold text-primary">
                                            {orders.length * 50} {/* Change 50 to your preferred points-per-order */}
                                        </span>
                                        <span className="text-[10px] text-muted uppercase tracking-tighter">
                                            50 pts / order
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;