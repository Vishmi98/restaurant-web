"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { HERO_IMAGES } from "@/constants/data";


const Hero = () => {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Animation Variants
    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.4,
                duration: 0.8,
                ease: "easeOut" as const // <--- Add this
            }
        })
    };

    return (
        <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
            {/* Background Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={HERO_IMAGES[current]}
                        alt={`hero-${current}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
                <div className="text-center">
                    <motion.p
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="uppercase tracking-[0.4em] text-sm md:text-base text-white mb-4"
                    >
                        Welcome to
                    </motion.p>

                    <motion.h1
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="font-libre text-white text-3xl md:text-5xl lg:text-6xl font-medium uppercase leading-tight tracking-wide"
                    >
                        Fresh Taste <br className="md:hidden" /> Exceptional Dining
                    </motion.h1>

                    <motion.div
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                    >
                        <motion.button
                            onClick={() => router.push("/menu")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 border-2 border-primary text-primary uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                        >
                            Discover Menus
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;