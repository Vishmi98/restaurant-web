"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";


const VideoSection = () => {
    const [open, setOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    const pulseVariant: Variants = {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
            },
        },
    };

    return (
        <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden my-20">
            {/* Background Image with subtle parallax-like scale */}
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" as const }}
                className="absolute inset-0"
            >
                <Image
                    src="/5.jpg"
                    alt="Video Background"
                    fill
                    className="object-cover"
                />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Center Play Button Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6">
                <div className="relative flex items-center justify-center">
                    {/* The Rippling Outer Ring */}
                    <motion.div
                        animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" as const }}
                        className="absolute w-24 h-24 rounded-full border border-white/50"
                    />

                    {/* The Main Button */}
                    <motion.button
                        variants={pulseVariant}
                        animate="animate"
                        whileHover={{ scale: 1.15, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOpen(true)}
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-[1px] border-white/30 text-white cursor-pointer flex items-center justify-center bg-white/10 backdrop-blur-md z-20 transition-colors duration-500"
                    >
                        <FaPlay className="ml-1 transition-transform group-hover:scale-110" size={24} />
                    </motion.button>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[1005] p-4"
                    >
                        {/* Close logic on backdrop click */}
                        <div className="absolute inset-0" onClick={() => setOpen(false)} />

                        <motion.button
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            onClick={() => setOpen(false)}
                            className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl z-[1010] transition-colors"
                        >
                            ✕
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", damping: 25, stiffness: 200 }
                            }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            className="relative w-full max-w-5xl aspect-video shadow-2xl rounded-2xl overflow-hidden bg-black"
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VideoSection;