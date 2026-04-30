"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";

import { NavProps } from "@/constants/types";
import { NAV_ITEMS } from "@/constants/data";

const Nav = ({ openNav }: NavProps) => {
    const [navBg, setNavBg] = useState(false);
    const [activeHash, setActiveHash] = useState("#");
    const [cartCount, setCartCount] = useState(2);

    useEffect(() => {
        const handleScroll = () => {
            setNavBg(window.scrollY >= 90);

            // Filter to ONLY include strings starting with #
            // This ignores "/menu" which is a separate page
            const anchorSections = NAV_ITEMS
                .map((item) => item.href)
                .filter((href) => href.startsWith("#") && href !== "#");

            let currentSection = "#";

            anchorSections.forEach((id) => {
                try {
                    const section = document.querySelector(id) as HTMLElement;

                    if (section) {
                        const top = section.offsetTop - 120;
                        const height = section.offsetHeight;

                        if (
                            window.scrollY >= top &&
                            window.scrollY < top + height
                        ) {
                            currentSection = id;
                        }
                    }
                } catch (e) {
                    // Silently catch errors if an invalid selector slips through
                    console.error("Invalid selector:", id);
                }
            });

            if (window.scrollY < 200) {
                currentSection = "#";
            }

            setActiveHash(currentSection);
        };

        const handleHashChange = () => {
            setActiveHash(window.location.hash || "#");
        };

        handleScroll();
        handleHashChange();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1005] h-[9vh] md:h-[13vh] transition-all duration-300 ${navBg
                ? "bg-black shadow-md text-white"
                : "bg-transparent text-white"
                }`}
        >
            <div className="flex items-center justify-between h-full w-[90%] xl:w-[85%] mx-auto">
                {/* Logo */}
                <Link href="/" className="w-full">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={60}
                        height={60}
                        priority
                        className="object-contain" // Ensures the image isn't squished
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center justify-center gap-6 w-full">
                    {NAV_ITEMS.map((link) => {
                        const isActive = activeHash === link.href;

                        return (
                            <Link href={link.href} key={link.label}>
                                <span
                                    className={`relative uppercase text-sm tracking-wide cursor-pointer transition-all duration-300

  ${isActive ? "text-white font-semibold" : "text-white/80"}

  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
  after:w-full after:bg-primary
  after:transition-transform after:duration-300

  ${isActive
                                            ? "after:scale-x-100"
                                            : "after:scale-x-0 hover:after:scale-x-100"
                                        }
`}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side */}
                <div className="flex items-center justify-end gap-4 w-full">
                    {/* Cart Icon */}
                    <Link href="/cart" className="relative group p-2">
                        <IoCartOutline className="w-6 h-6 text-white group-hover:text-primary transition-colors cursor-pointer" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-0 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black animate-in fade-in zoom-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Button */}
                    <div className="hidden lg:block">
                        <Link
                            href="/menu"
                            className={`uppercase px-5 py-2 text-xs border-2 transition-all duration-300 cursor-pointer ${navBg
                                ? "border-white hover:bg-white hover:text-black"
                                : "border-white hover:bg-white hover:text-black"
                                }`}
                        >
                            Order Online
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <HiBars3BottomLeft
                        onClick={openNav}
                        className={`w-8 h-8 cursor-pointer lg:hidden ${navBg ? "text-white" : "text-white"
                            }`}
                    />
                </div>
            </div>
        </header>
    );
};

export default Nav;