import Image from "next/image";
import React from "react";

type FeedbackCardProps = {
    name: string;
    job: string;
    message: string;
    image: string;
};

const FeedbackCard = ({ name, job, message, image }: FeedbackCardProps) => {
    return (
        <div className="text-white h-full">

            {/* User Info */}
            <div className="space-y-3 mb-5">
                <div className="relative w-20 h-20">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>

                <div>
                    <h4 className="font-semibold text-white text-lg md:text-2xl mb-2">{name}</h4>
                    <p className="text-xs md:text-base text-primary">{job}</p>
                </div>
            </div>

            {/* Feedback Text */}
            <p className="text-sm md:text-base text-white italic leading-relaxed mb-6">
                &quot;{message}&quot;
            </p>
        </div>
    );
};

export default FeedbackCard;