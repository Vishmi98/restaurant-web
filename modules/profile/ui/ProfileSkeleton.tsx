const ProfileSkeleton = () => {
    return (
        <main className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Back Button */}
                <div className="h-5 w-36 bg-zinc-800 rounded mb-8 animate-pulse" />

                {/* Header */}
                <div className="relative overflow-hidden bg-zinc-900 border border-white/10 rounded-3xl p-5 md:p-8 mb-8 animate-pulse">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* Left */}
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Avatar */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-800 flex-shrink-0" />

                            {/* Name */}
                            <div className="space-y-3">
                                <div className="h-7 md:h-9 w-40 md:w-56 bg-zinc-800 rounded-lg" />
                                <div className="h-4 w-32 bg-zinc-800 rounded" />
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="h-12 w-32 bg-zinc-800 rounded-full" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Info */}
                        <section className="bg-zinc-900 border border-white/10 rounded-3xl p-5">
                            <div className="h-8 w-52 bg-zinc-800 rounded mb-6" />

                            <div className="grid md:grid-cols-2 gap-5">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="bg-black/40 rounded-2xl p-4 space-y-3"
                                    >
                                        <div className="h-3 w-24 bg-zinc-800 rounded" />
                                        <div className="h-5 w-full bg-zinc-800 rounded" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Orders */}
                        <section className="bg-zinc-900 border border-white/10 rounded-3xl p-5">
                            <div className="h-8 w-44 bg-zinc-800 rounded mb-6" />

                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-between gap-4 bg-black/40 rounded-2xl p-4"
                                    >
                                        <div className="space-y-2 flex-1">
                                            <div className="h-5 w-32 bg-zinc-800 rounded" />
                                            <div className="h-4 w-48 bg-zinc-800 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <section className="bg-zinc-900 border border-white/10 rounded-3xl p-5">
                            <div className="h-7 w-40 bg-zinc-800 rounded mb-5" />

                            <div className="space-y-3">
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="h-16 bg-black/40 border border-white/5 rounded-2xl"
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="bg-zinc-900 border border-white/10 rounded-3xl p-5">
                            <div className="h-7 w-44 bg-zinc-800 rounded mb-5" />

                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="h-4 w-28 bg-zinc-800 rounded" />
                                        <div className="h-4 w-16 bg-zinc-800 rounded" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfileSkeleton;