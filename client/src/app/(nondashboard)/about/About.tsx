import React from 'react';
import Image from 'next/image'; // Import the Image component

const AboutPage = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about.jpg"
                        alt="about-img"
                        fill
                        className="object-cover"
                        priority // Optional: Prioritize loading for hero image
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="relative z-20 container mx-auto px-5 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-5">Sayin Properties Limited</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Sayin Properties Limited is a dynamic real estate and property firm offering a unique and unmatched value proposition across all core services essential to the success of any real estate venture.

                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;