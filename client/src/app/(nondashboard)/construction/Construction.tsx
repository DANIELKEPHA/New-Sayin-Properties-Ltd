import React from 'react';
import Image from 'next/image'; // Import the Image component

const Construction = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/construction.jpg"
                        alt="construction"
                        fill
                        className="object-cover"
                        priority // Optional: Prioritize loading for hero image
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="relative z-20 container mx-auto px-5 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-5">Real Estate Development & Construction</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Sayin Properties Limited is a real estate development company, engaged in acquisition of virgin sites for new development; existing properties for redevelopment; and rehabilitation of dated properties to meet current functional needs and trends
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Construction;