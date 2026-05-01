"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBars3BottomLeft, HiOutlineShoppingBag } from "react-icons/hi2";
import { usePathname, useRouter } from "next/navigation";

import { NavProps } from "@/constants/types";
import { NAV_ITEMS } from "@/constants/data";
import useCartStore from "@/store/cartStore";
import userStore from "@/store/userStore";
import { getCookieUser } from "@/utils/cookie.util";


const Nav = ({ openNav }: NavProps) => {
    const { user, addUser } = userStore();
    const cartCount = useCartStore((state) => state.cartCount);
    const router = useRouter();
    const [navBg, setNavBg] = useState(false);
    const [activeHash, setActiveHash] = useState("#");
    const pathname = usePathname();

    console.log("user", user);

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

    useEffect(() => {
        const cookieUser = getCookieUser();
        if (cookieUser && !user) {
            addUser(cookieUser);
        }
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
                        const isActive = link.href.startsWith("#")
                            ? pathname === "/" && activeHash === link.href
                            : pathname === link.href;

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
                {/* Right Side */}
                <div className="flex items-center justify-end gap-4 w-full">
                    {/* Cart Icon (Existing) */}
                    <Link href="/cart" className="relative group p-2">
                        <HiOutlineShoppingBag className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-0 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* AUTH SECTION */}
                    {user ? (
                        <button
                            type="button"
                            onClick={() => router.push("/profile")}
                            className="flex items-center gap-2 group cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">
                                    {user.firstName?.charAt(0).toUpperCase() ||
                                        "U"}
                                </span>
                            </div>

                            <span className="hidden sm:block text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                                {user.firstName}
                            </span>
                        </button>
                    ) : (
                        <Link href="/login">
                            <button
                                type="button"
                                className="px-5 py-2 text-sm font-semibold bg-primary text-black rounded-full hover:bg-white transition-all duration-300"
                            >
                                Login
                            </button>
                        </Link>
                    )}

                    {/* Mobile Menu (Existing) */}
                    <HiBars3BottomLeft
                        onClick={openNav}
                        className="w-8 h-8 cursor-pointer lg:hidden text-white"
                    />
                </div>
            </div>
        </header>
    );
};

export default Nav;