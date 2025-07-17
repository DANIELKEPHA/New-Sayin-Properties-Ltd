import React from 'react';
import Image from 'next/image'; // Import the Image component

const Land = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/landing-search3.png"
                        alt="landing-call-to-action"
                        fill
                        className="object-cover"
                        priority // Optional: Prioritize loading for hero image
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="relative z-20 container mx-auto px-5 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-5">Buying and Selling of Land</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        While buying and selling land may seem straightforward, the process often involves complex steps that require more than just knowing what to do — you must also know how to do it. That’s where Sayin Properties Limited comes in. With extensive experience in land transactions, we guide clients through every stage, helping you navigate the legal, financial, and procedural challenges with confidence and ease.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Land;