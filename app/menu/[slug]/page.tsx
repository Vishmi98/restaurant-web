"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsStar } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { motion } from "framer-motion";

import { getDishByName } from "@/modules/dish/dish.service";
import { DishDataType } from "@/modules/dish/dish.types";
import CartToast from "@/modules/cart/ui/CartToast";
import DishSkeleton from "@/modules/dish/ui/DishSkeleton";

const DishDetailPage = () => {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;

    console.log("slug", slug);
    const router = useRouter();

    const [dish, setDish] = useState<DishDataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchDish = async (slugName: string) => {
            try {
                setLoading(true);

                // 1. Decode the URI (converts %26 back to & if it exists)
                let formattedName = decodeURIComponent(slugName);

                // 2. Logic to handle the specific "chicken--vegetable-fry" -> "Chicken & Vegetable Fry"
                // We replace double hyphens with " & " and single hyphens with a space
                formattedName = formattedName
                    .replace(/--/g, " & ")  // Handes the ' & ' part
                    .replace(/-/g, " ");    // Handles remaining spaces

                // 3. Optional: If your DB is case-sensitive, you might need to capitalize
                // but usually, it's better to let the Backend handle case-insensitivity.

                console.log("Fetching with name:", formattedName);

                const response = await getDishByName({ name: formattedName });

                if (response.success) {
                    setDish(response.dish);
                }
            } catch (error) {
                console.error("Failed to fetch dish:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchDish(slug);
        }
    }, [slug]);

    const handleQuantity = (type: "inc" | "dec") => {
        if (type === "dec" && quantity > 1) {
            setQuantity(quantity - 1);
        }

        if (type === "inc") {
            setQuantity(quantity + 1);
        }
    };

    const addToCartHandler = () => {
        setShowToast(true);
    };

    /* Loading */
    if (loading) {
        return <DishSkeleton />;
    }

    /* Not found */
    if (!dish) {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <h2 className="text-3xl font-libre mb-4">
                    Dish Not Found
                </h2>

                <Link
                    href="/menu"
                    className="bg-primary px-8 py-3 rounded-full font-bold"
                >
                    Back to Menu
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push("/menu")}
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors group"
                    >
                        <BsArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />

                        <span>Back to Menu</span>
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square w-full max-w-[500px] mx-auto"
                    >
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />

                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
                            <Image
                                src={dish.imagePath}
                                alt={dish.name}
                                fill
                                className="object-cover p-8"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-primary uppercase text-sm tracking-widest">
                            {dish.category}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-libre font-bold mt-2 mb-4">
                            {dish.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <BsStar
                                        key={i}
                                        size={18}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>

                            <span className="text-zinc-500 text-sm">
                                24 Reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-primary">
                                {dish.price}
                            </span>

                            {dish.newPrice && (
                                <span className="text-xl text-zinc-500 line-through">
                                    {dish.newPrice}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            {dish.description}
                        </p>

                        {/* Quantity + Add */}
                        <div className="flex flex-wrap gap-6 items-center">
                            <div className="flex items-center border border-zinc-700 rounded-full px-4 py-2 bg-zinc-900">
                                <button
                                    onClick={() =>
                                        handleQuantity("dec")
                                    }
                                >
                                    <BiMinus size={20} />
                                </button>

                                <span className="w-12 text-center font-bold text-xl">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        handleQuantity("inc")
                                    }
                                >
                                    <BiPlus size={20} />
                                </button>
                            </div>

                            <button
                                onClick={addToCartHandler}
                                className="flex-1 min-w-[220px] bg-primary text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary/80 transition-all"
                            >
                                <CgShoppingCart size={22} />
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Extra Description */}
                <div className="mt-20">
                    <h3 className="text-2xl font-libre border-b border-primary w-max mb-6">
                        Description
                    </h3>

                    <p className="text-zinc-400 max-w-3xl leading-relaxed">
                        Our {dish.name} is prepared fresh daily
                        using premium ingredients and crafted
                        with care for an unforgettable dining
                        experience.
                    </p>
                </div>
            </div>

            <CartToast
                show={showToast}
                itemName={dish.name}
                quantity={quantity}
            />
        </main>
    );
};

export default DishDetailPage;