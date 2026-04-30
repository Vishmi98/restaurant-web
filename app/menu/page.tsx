"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";

import CartToast from "@/modules/cart/ui/CartToast";
import DishCard from "@/modules/dish/ui/DishCard";
import { DishDataType } from "@/modules/dish/dish.types";
import { getDishes } from "@/modules/dish/dish.service";
import DishCardSkeleton from "@/modules/dish/ui/DishCardSkeleton";


const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        itemName: "",
    });

    const [dishes, setDishes] = useState<DishDataType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);

                const response = await getDishes();

                if (response.success) {
                    setDishes(response.dishes || []);
                }
            } catch (error) {
                console.error("Failed to fetch dishes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    const handleAddToCart = (name: string) => {
        setToastConfig({
            show: true,
            itemName: name,
        });
    };

    /* Use fetched dishes */
    const categories = [
        "All",
        ...new Set(dishes.map((dish) => dish.category)),
    ];

    const filteredDishes =
        selectedCategory === "All"
            ? dishes
            : dishes.filter(
                (dish) => dish.category === selectedCategory
            );

    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.4,
                duration: 0.8,
                ease: "easeOut" as const,
            },
        }),
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="relative h-[40vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src="/banner-4.jpg"
                    alt="Our Menu"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-libre font-bold uppercase tracking-widest"
                    >
                        Our Menu
                    </motion.h1>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 py-12 md:px-16 lg:px-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-zinc-800 pb-8">
                    <div>
                        <h2 className="text-2xl font-libre">
                            Experience Flavors
                        </h2>

                        <p className="text-muted text-sm">
                            Showing {filteredDishes.length} delicious options
                        </p>
                    </div>

                    {/* Filter */}
                    <div className="relative w-full md:w-64">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-xl hover:border-primary transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <FiFilter
                                    size={18}
                                    className="text-primary"
                                />
                                <span>{selectedCategory}</span>
                            </div>

                            <BiChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                    />

                                    <motion.ul
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        className="absolute right-0 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden z-20"
                                    >
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(
                                                            cat
                                                        );
                                                        setIsOpen(
                                                            false
                                                        );
                                                    }}
                                                    className={`w-full text-left px-5 py-3 text-sm hover:bg-zinc-800 ${selectedCategory ===
                                                        cat
                                                        ? "text-primary bg-zinc-800/50"
                                                        : "text-zinc-300"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {Array.from({ length: 8 }).map(
                            (_, index) => (
                                <DishCardSkeleton key={index} />
                            )
                        )}
                    </div>
                ) : (
                    <>
                        {/* Dish Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredDishes.map((dish) => (
                                    <motion.div
                                        key={dish.id}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                        }}
                                    >
                                        <DishCard
                                            card={dish}
                                            onAdd={() =>
                                                handleAddToCart(
                                                    dish.name
                                                )
                                            }
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Empty State */}
                        {filteredDishes.length ===
                            0 && (
                                <div className="text-center py-20 text-muted">
                                    No dishes found.
                                </div>
                            )}
                    </>
                )}
            </section>

            {/* CTA */}
            <section className="bg-white/5 py-16 text-center px-6">
                <h2 className="text-2xl font-libre mb-4">
                    Craving Something Special?
                </h2>

                <p className="text-zinc-400 mb-8">
                    We offer custom catering for your private
                    events.
                </p>

                <motion.div
                    variants={textVariant}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 border-2 border-primary text-primary uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </section>

            <CartToast
                show={toastConfig.show}
                itemName={toastConfig.itemName}
            />
        </main>
    );
};

export default MenuPage;