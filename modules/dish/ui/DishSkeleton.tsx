import React from 'react'

const DishSkeleton = () => {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                {/* Back Button Skeleton */}
                <div className="h-6 w-32 bg-zinc-800 rounded-md animate-pulse mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Skeleton */}
                    <div className="relative aspect-square w-full max-w-[500px] mx-auto bg-zinc-900 rounded-3xl animate-pulse" />

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-12 w-3/4 bg-zinc-800 rounded-md animate-pulse" />

                        {/* Stars Skeleton */}
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-5 w-5 bg-zinc-800 rounded-full animate-pulse" />
                            ))}
                        </div>

                        <div className="h-10 w-32 bg-zinc-800 rounded-md animate-pulse" />
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                            <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                        </div>

                        <div className="flex gap-6 mt-8">
                            <div className="h-14 w-32 bg-zinc-800 rounded-full animate-pulse" />
                            <div className="h-14 flex-1 bg-zinc-800 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DishSkeleton