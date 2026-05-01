"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { DishDataType } from "../dish.types";


interface ExtendedDishCardProps {
    card: DishDataType;
    onAdd: () => void;
}

const DishCard = ({ card, onAdd }: ExtendedDishCardProps) => {
    const generateSlugUrl = (dish: DishDataType) => {
        return dish.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")      // spaces => -
            .replace(/&/g, "&")        // keep &
            .replace(/[^\w&-]+/g, ""); // remove others except letters, numbers, _, -, &
    };

    return (
        <div className="group relative text-white p-6 text-center shadow-lg">
            {/* Image */}
            <div className="relative w-full h-[300px] overflow-hidden rounded-full">
                <Image
                    src={card.imagePath}
                    alt={card.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/30 rounded-full
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500 hidden md:block"
                />

                {/* Add to Cart Button */}
                <button
                    type="button"
                    onClick={onAdd}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-primary text-white px-5 py-2 rounded-full text-sm md:text-base
                    cursor-pointer font-medium w-3/4
                    opacity-0 scale-75
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-500 ease-out z-10 hidden md:block"
                >
                    Add to Cart
                </button>
            </div>

            {/* Name */}
            <Link href={`/menu/${generateSlugUrl(card)}`}>
                <h3 className="text-lg font-semibold mb-2 font-libre">
                    {card.name}
                </h3>
            </Link>

            {/* Stars */}
            <div className="text-yellow-400 mb-2 text-sm">★★★★★</div>

            {/* Price */}
            <div className="text-lg font-bold">
                {card.newPrice && (
                    <span className="line-through text-muted mr-2">
                        {card.newPrice}
                    </span>
                )}
                {card.price}
            </div>
            <div className="flex item-center justify-center mt-3">
                <button
                    type="button"
                    onClick={onAdd}
                    className="
                bg-primary text-white px-5 py-2 rounded-full text-sm md:text-base
                cursor-pointer font-medium w-3/4 z-10 block md:hidden"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default DishCard;