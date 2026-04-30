import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer id="contact" className="relative w-full text-white px-6 md:px-16 lg:px-24 pt-20 pb-8 overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/4.png"
                    alt="Footer Background"
                    fill
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#000]/75" />
            </div>

            {/* Top Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                {/* Contact */}
                <div className="md:border-r md:border-white/20 md:pr-10">
                    <h3 className="tracking-[0.3em] uppercase font-montserrat mb-6">
                        Contact Us
                    </h3>

                    <p className="font-light leading-8 text-white">
                        T. +94 77 123 4567
                    </p>
                    <p className="font-light leading-8 text-white">
                        M. serendib@example.com
                    </p>
                </div>

                {/* Address */}
                <div className="md:border-r md:border-white/20 md:px-10">
                    <h3 className="tracking-[0.3em] uppercase font-montserrat mb-6">
                        Address
                    </h3>

                    <p className="font-light leading-8 text-white">
                        No 25, Galle Road
                    </p>
                    <p className="font-light leading-8 text-white">
                        Kalutara, Sri Lanka
                    </p>
                </div>

                {/* Opening Hours */}
                <div className="md:pl-10">
                    <h3 className="tracking-[0.3em] uppercase font-montserrat mb-6">
                        Opening Hours
                    </h3>

                    <p className="font-light leading-8 text-white">
                        Everyday : From 10.00 To 22.00
                    </p>
                    <p className="font-light leading-8 text-white">
                        Kitchen Closes At 21.30
                    </p>
                </div>
            </div>

            {/* Divider with Logo */}
            <div className="max-w-7xl mx-auto mt-20 flex items-center gap-3 md:gap-6">
                <div className="flex-1 min-w-[30px] md:min-w-0 h-px bg-muted" />

                <h2 className="font-libre uppercase text-sm md:text-2xl tracking-[0.12em] md:tracking-[0.2em] text-white whitespace-nowrap px-2 md:px-4">
                    Traditional Food
                </h2>

                <div className="flex-1 min-w-[30px] md:min-w-0 h-px bg-muted" />
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-xs md:text-sm tracking-[0.25em] uppercase font-montserrat">
                    <a href="#" className="hover:text-primary transition">
                        TikTok
                    </a>

                    <span className="text-primary">◊</span>

                    <a href="#" className="hover:text-primary transition">
                        Facebook
                    </a>

                    <span className="text-primary">◊</span>

                    <a href="#" className="hover:text-primary transition">
                        Instagram
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 text-center md:text-right">
                    © 2026 Serendib Blossom, All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;