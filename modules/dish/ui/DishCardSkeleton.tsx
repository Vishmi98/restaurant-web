import React from 'react'

const DishCardSkeleton = () => {
    return (
        <div className="text-white p-6 text-center shadow-lg">
            {/* Image Circle */}
            <div className="w-full h-[300px] bg-zinc-800 animate-pulse rounded-full" />

            {/* Name Link Area */}
            <div className="h-6 bg-zinc-800 animate-pulse rounded mt-4 mb-2 w-3/4 mx-auto" />

            {/* Stars Area */}
            <div className="h-3 bg-zinc-800 animate-pulse rounded mb-2 w-1/4 mx-auto" />

            {/* Price Area */}
            <div className="h-6 bg-zinc-800 animate-pulse rounded w-1/3 mx-auto" />
        </div>
    )
}

export default DishCardSkeleton