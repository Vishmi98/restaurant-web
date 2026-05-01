"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import Image from "next/image";

import CartToast from "@/modules/cart/ui/CartToast";
import DishCard from "@/modules/dish/ui/DishCard";
import { DishDataType } from "@/modules/dish/dish.types";
import { getDishes } from "@/modules/dish/dish.service";
import DishCardSkeleton from "@/modules/dish/ui/DishCardSkeleton";
import useCartStore from "@/store/cartStore";


const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const OurShop = () => {
    const [toastConfig, setToastConfig] = useState({
        show: false,
        itemName: "",
        quantity: 1,
    });
    const [dishes, setDishes] = useState<DishDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addToCart);

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

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);

                const response = await getDishes();

                if (response.success) {
                    setDishes(response.dishes);
                }
            } catch (error) {
                console.error("Failed to fetch dishes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    // Global timer to hide the toast
    useEffect(() => {
        if (toastConfig.show) {
            const timer = setTimeout(() => {
                setToastConfig((prev) => ({ ...prev, show: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toastConfig.show]);

    const fadeInDown = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const // <--- Add this here
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const // <--- And here
            }
        }
    };

    return (
        <section className="relative w-full py-10 text-white overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/4.png"
                    alt="background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/75" />
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInDown}
                    className="text-lg md:text-2xl font-libre mb-4 md:mb-6 text-primary text-center"
                >
                    Our Shop
                </motion.h2>

                <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeInUp}
                    className="font-libre text-white text-2xl lg:text-5xl font-medium uppercase leading-tight tracking-wide text-center mb-12"
                >
                    Delicious Dishes
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <Carousel
                        responsive={responsive}
                        infinite
                        autoPlay
                        autoPlaySpeed={3000}
                        arrows
                        keyBoardControl
                        containerClass="pb-5"
                        itemClass="px-4"
                    >
                        {loading
                            ? Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="py-2">
                                    <DishCardSkeleton />
                                </div>
                            ))
                            : dishes.map((dish) => (
                                <div key={dish.id} className="py-2">
                                    <DishCard
                                        card={dish}
                                        onAdd={() => handleAddToCart(dish)}
                                    />
                                </div>
                            ))}
                    </Carousel>
                </motion.div>
            </div>

            <CartToast
                show={toastConfig.show}
                itemName={toastConfig.itemName}
                quantity={toastConfig.quantity}
            />
        </section>
    );
};

export default OurShop;