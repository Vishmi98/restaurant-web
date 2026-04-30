/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "react-multi-carousel/lib/styles.css";

import FeedbackCard from "./FeedbackCard";

import { FEEDBACKS } from "@/constants/data";


const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

/* Custom Bottom Arrows */
const ButtonGroup = ({ next, previous }: any) => {
    return (
        <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
            <button
                onClick={previous}
                className="w-12 h-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-black transition duration-300"
            >
                <FiArrowLeft size={20} />
            </button>

            <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition duration-300"
            >
                <FiArrowRight size={20} />
            </button>
        </div>
    );
};

const Feedback = () => {
    return (
        <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Right Side - Image */}
                <div className="w-full md:flex-1 relative h-[300px] md:h-[500px]">
                    <Image
                        src="/6.jpg"
                        alt="Feedback"
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/* Left Side - Text */}
                <div className="w-full md:flex-1 min-w-0">
                    <h2 className="text-lg md:text-2xl font-libre mb-4 md:mb-6 text-primary">
                        Client Feedback
                    </h2>

                    <h1 className="font-libre text-white text-2xl lg:text-5xl font-medium uppercase leading-tight tracking-wide mb-8">
                        What our customers say
                    </h1>

                    {/* Feedback Cards */}
                    <Carousel
                        responsive={responsive}
                        infinite
                        autoPlay
                        autoPlaySpeed={4000}
                        arrows={false}
                        keyBoardControl
                        renderButtonGroupOutside
                        customButtonGroup={<ButtonGroup />}
                        containerClass="w-full"
                        itemClass="px-2"
                    >
                        {FEEDBACKS.map((item) => (
                            <FeedbackCard
                                key={item.id}
                                name={item.name}
                                job={item.job}
                                message={item.message}
                                image={item.image}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* Decorative circle */}
            <div className="hidden md:block absolute top-0 right-0">
                <Image
                    src="/3.png"
                    alt="decor"
                    height={400}
                    width={400}
                    className="rounded-full opacity-15"
                />
            </div>
        </section>
    );
};

export default Feedback;