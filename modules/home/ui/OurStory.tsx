"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


const OurStory = () => {
    // Animation Variants
    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.4,
                duration: 0.8,
                ease: "easeOut" as const // <--- Narrow the type here
            }
        })
    };

    const imageVariant = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section
            id="our-story"
            className="w-full py-20 px-6 md:px-16 lg:px-24 bg-black relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Left Side - Text */}
                <div className="w-full md:flex-1">
                    <motion.h2
                        variants={textVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="text-lg md:text-2xl font-libre mb-4 md:mb-6 text-primary"
                    >
                        Our Story
                    </motion.h2>

                    <motion.h1
                        variants={textVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                        className="font-libre text-white text-2xl lg:text-5xl font-medium uppercase leading-tight tracking-wide"
                    >
                        Traditional & Modern Service
                    </motion.h1>

                    <motion.p
                        variants={textVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.4}
                        className="text-muted text-base md:text-lg leading-relaxed my-4"
                    >
                        Welcome to Serendib Blossom, where tradition meets modern dining.
                        We bring you the rich flavors of Sri Lanka crafted with passion,
                        fresh ingredients, and authentic recipes passed down through generations.
                    </motion.p>

                    <motion.p
                        variants={textVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.6}
                        className="text-muted text-base md:text-lg leading-relaxed"
                    >
                        Every dish tells a story — a journey of spices, culture, and love
                        for food. Our goal is to create a memorable dining experience that
                        feels like home.
                    </motion.p>
                </div>

                {/* Right Side - Image */}
                <motion.div
                    variants={imageVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full md:flex-1 relative h-[300px] md:h-[500px]"
                >
                    <Image
                        src="/banner-sm-01.png"
                        alt="Our Story"
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </motion.div>

                {/* Rotating Badge */}
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-10 left-155 rounded-full animate-[spin_30s_linear_infinite]"
                >
                    <Image
                        src="/3.png"
                        alt="badge"
                        height={120}
                        width={120}
                        className="rounded-full"
                    />
                </motion.div> */}

                {/* Background Circle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.15 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 rounded-full"
                >
                    <Image
                        src="/3.png"
                        alt="background"
                        height={400}
                        width={400}
                        className="rounded-full"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default OurStory;