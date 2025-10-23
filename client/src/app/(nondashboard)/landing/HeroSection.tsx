"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const HeroSection = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("buy");
    const router = useRouter();

    const handleLocationSearch = async () => {
        try {
            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) return;

            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    trimmedQuery
                )}.json?access_token=${
                    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
                }&fuzzyMatch=true`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const [lng, lat] = data.features[0].center;
                dispatch(
                    setFilters({
                        location: trimmedQuery,
                        coordinates: [lat, lng],
                        transactionType: activeFilter,
                    })
                );
                const params = new URLSearchParams({
                    location: trimmedQuery,
                    lat: lat.toString(),
                    lng: lng.toString(),
                    type: activeFilter,
                });
                router.push(`/search?${params.toString()}`);
            }
        } catch (error) {
            console.error("Error searching location:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLocationSearch();
        }
    };

    const stats = [
        { number: "120+", label: "Real Estate Experts" },
        { number: "50+", label: "Verified Developers" },
        { number: "15+", label: "Cities Covered" },
        { number: "98%", label: "Client Satisfaction" },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Top Contact Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-3">
                        <div className="flex items-center space-x-6 text-sm text-slate-300">
                            <div className="flex items-center space-x-2">
                                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@premiumestate.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-slate-300 hover:text-white transition-colors text-sm">
                                Schedule Consultation
                            </button>
                            <div className="w-px h-4 bg-slate-600"></div>
                            <button className="text-slate-300 hover:text-white transition-colors text-sm">
                                Agent Login
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Hero Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center space-y-20">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">

                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Find Your
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Dream </span>
                                Property
                            </h1>

                            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                                Premium real estate solutions with unmatched expertise. Discover exclusive properties,
                                investment opportunities, and personalized service for discerning clients.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold text-white">{stat.number}</div>
                                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 pt-6"
                        >
                            <Button className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 flex items-center justify-center">
                                Get Started Today
                                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Search Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <div className="space-y-6">

                                {/* Transaction Type Toggle */}
                                <div className="flex bg-slate-800 rounded-lg p-1">
                                    {['buy', 'sell'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveFilter(type)}
                                            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                                                activeFilter === type
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'text-slate-300 hover:text-white'
                                            }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {/* Search Input */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <Input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Enter location, property type, or keyword..."
                                            className="h-14 pl-12 pr-4 text-lg border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleLocationSearch}
                                        className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Properties
                                    </Button>
                                </div>

                                {/* Trust Badge */}
                                <div className="flex items-center justify-center space-x-2 text-sm text-slate-400 pt-4">
                                    <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>SSL Secured • 24/7 Support • Verified Listings</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
                <div className="animate-bounce">
                    <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;