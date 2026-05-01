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
import useCartStore from "@/store/cartStore";

const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isOpen, setIsOpen] = useState(false);

    const [toastConfig, setToastConfig] = useState({
        show: false,
        itemName: "",
        quantity: 1,
    });

    const [dishes, setDishes] = useState<DishDataType[]>([]);
    const [loading, setLoading] = useState(true);

    const addToCart = useCartStore((state) => state.addToCart);

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

    const handleAddToCart = (dish: DishDataType) => {
        addToCart({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: 1,
            image: dish.imagePath,
        });

        setToastConfig({
            show: true,
            itemName: dish.name,
            quantity: 1,
        });

        setTimeout(() => {
            setToastConfig((prev) => ({
                ...prev,
                show: false,
            }));
        }, 2500);
    };

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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-800 pb-8">
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
                            className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <FiFilter className="text-primary" />
                                <span>{selectedCategory}</span>
                            </div>

                            <BiChevronDown
                                className={`transition ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
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
                                                    setSelectedCategory(cat);
                                                    setIsOpen(false);
                                                }}
                                                className="w-full text-left px-5 py-3 hover:bg-zinc-800"
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <DishCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDishes.map((dish) => (
                            <DishCard
                                key={dish.id}
                                card={dish}
                                onAdd={() => handleAddToCart(dish)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Toast */}
            <CartToast
                show={toastConfig.show}
                itemName={toastConfig.itemName}
                quantity={toastConfig.quantity}
            />
        </main>
    );
};

export default MenuPage;