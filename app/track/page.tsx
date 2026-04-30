"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowLeft, BsChatDots, BsPhone } from "react-icons/bs";
import { IoFastFoodOutline, IoBicycleOutline, IoCheckmarkDoneOutline } from "react-icons/io5";


const TRACKING_STEPS = [
    { id: 1, title: "Order Received", desc: "We have received your order", icon: <IoCheckmarkDoneOutline />, status: "complete" },
    { id: 2, title: "Preparing Food", desc: "Our chefs are working their magic", icon: <IoFastFoodOutline />, status: "current" },
    { id: 3, title: "On the Way", desc: "Driver is heading to your location", icon: <IoBicycleOutline />, status: "upcoming" },
    { id: 4, title: "Delivered", desc: "Enjoy your gourmet meal!", icon: <IoCheckmarkDoneOutline />, status: "upcoming" },
];

const TrackOrderPage = () => {
    return (
        <main className="min-h-screen bg-black text-white pt-28 md:pt-35 pb-25">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <Link href="/menu" className="flex items-center gap-2 text-muted hover:text-primary transition-colors mb-4">
                            <BsArrowLeft /> <span>Back to Menu</span>
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-libre font-bold">Track Order <span className="text-primary">#RF-82910</span></h1>
                    </div>
                    <div className="bg-white/10 border border-white/30 px-10 py-2 rounded-2xl flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-muted uppercase tracking-widest">Est. Arrival</p>
                            <p className="font-bold text-xl text-primary">12:45 PM</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Status Timeline */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/10 border border-white/30 p-4 rounded-[32px] relative overflow-hidden">
                            <div className="relative z-10 space-y-10">
                                {TRACKING_STEPS.map((step, index) => (
                                    <div key={step.id} className="flex gap-4 relative">
                                        {/* Connector Line */}
                                        {index !== TRACKING_STEPS.length - 1 && (
                                            <div className={`absolute left-6 top-12 w-0.5 h-10 ${step.status === 'complete' ? 'bg-primary' : 'bg-white/10'}`} />
                                        )}

                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 ${step.status === 'complete' ? 'bg-primary text-white' :
                                            step.status === 'current' ? 'bg-primary/20 text-primary border border-primary/50 animate-pulse' :
                                                'bg-white/10 text-muted'
                                            }`}>
                                            {step.icon}
                                        </div>

                                        <div>
                                            <h3 className={`font-bold ${step.status === 'upcoming' ? 'text-muted' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-sm text-muted">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Driver Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-primary/10 border border-primary/20 p-4 gap-2 rounded-[32px] flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 overflow-hidden relative">
                                    {/* Replace with actual driver image */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
                                </div>
                                <div>
                                    <p className="text-xs text-primary font-bold uppercase">Your Rider</p>
                                    <h4 className="font-bold text-lg">Alex Rodriguez</h4>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                    <BsChatDots />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                                    <BsPhone />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Map Simulation */}
                    <div className="lg:col-span-2">
                        <div className="h-[400px] lg:h-full min-h-[400px] bg-white/10 border border-white/30 rounded-[40px] overflow-hidden relative group">
                            {/* In a real app, integrate Google Maps or Mapbox here */}
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-73.9857,40.7484,14/1000x1000?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />

                            {/* Pulsing User Location */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-primary rounded-full relative">
                                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                                </div>
                            </div>

                            {/* Map Overlay Info */}
                            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium">Live Location Active</span>
                                </div>
                                <span className="text-xs text-zinc-400">Updates every 5s</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default TrackOrderPage;