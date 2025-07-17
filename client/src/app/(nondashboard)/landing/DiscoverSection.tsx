"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Create a motion-enabled Link component
const MotionLink = motion.create(Link);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            duration: 0.8,
        },
    },
};

const linkVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#6b21a8",
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

const features = [
    {
        imageSrc: "/placeholder-property-transactions.png",
        title: "Property Transactions",
        description:
            "Sayin Properties Limited is a professional real estate agent that offers valuable expertise and guidance in the buying and selling of properties. They navigate the complexities of the real estate market, handle legal paperwork, and negotiate the best price for properties. Their goal is to ensure a smooth and stress-free transaction, providing essential support at every step, despite the potential savings and commissions. By considering Sayin Properties Limited, you can streamline the entire process and save money.",
        linkText: "Explore Properties",
        linkHref: "/search",
        accentColor: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
        imageSrc: "/placeholder-land-acquisition.png",
        title: "Land Acquisition",
        description:
            "Land transactions are complex and require expertise in both buying and selling land. Sayin Properties Limited offers services to help navigate these transactions successfully. After confirming the genuine owner, they assist in signing a written, witnessed sale contract with the seller. They ensure the agreement is in writing and signed by both parties. Engaging Sayin Properties Limited for assistance includes due diligence, land and company searches, preparation of the Sale Agreement, and land transfer. Their extensive experience in land transactions ensures a smooth and successful process.",
        linkText: "Discover Land",
        linkHref: "/land",
        accentColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
        imageSrc: "/placeholder-legal-conveyancing.png",
        title: "Legal conveyancing",
        description:
            "Working on behalf of customers purchasing or selling real estate in Kenya, we are licensed conveyancers with a focus on property law. Sayin is a qualified, expert real estate company that represents customers in the nation who are purchasing or selling homes, properties, commercial spaces, or land. We handle all aspects of a real estate transaction, including the administration, finance, and legal issues. Processing and approving lease and mortgage agreements, setting up transfers, and managing other paperwork that sellers need to sign when buying real estate are all part of our job. We also give our clients advice on the documents' technical substance and its financial ramifications. In rare situations, we may act on behalf of both the buyer and the vendor in a single transaction.",
        linkText: "Learn More",
        linkHref: "/conveyancing",
        accentColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    },
    {
        imageSrc: "/placeholder-construction.png",
        title: "Real Estate Developers",
        description:
            "Sayin Properties Limited is a real estate development business that buys undeveloped land for new construction, redevelops existing properties, and renovates old structures to fit modern functional requirements and trends. We construct high-quality homes with a focus on utility, low space efficiency, structural stability, façade, and finishing elements while working on residential development projects. Our residences, which vary from single-family homes to multi-unit developments, are usually located in environmentally favorable areas. We use our knowledge of the functional and complementary demands of the users into the scheme idea, designs, and finishing of our commercial developments, whether they are for offices, retail establishments, or leisure activities. Our goal in both development projects is to provide goods with robust functioning characteristics.",
        linkText: "Build with Us",
        linkHref: "/construction",
        accentColor: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
    {
        imageSrc: "/placeholder-consultancy.png",
        title: "Real Estate Land",
        description:
            "Sayin Properties Limited is a trusted real estate consultancy firm offering expert guidance throughout the entire property and land lifecycle. We specialize in strategic planning, transaction advisory, market research, policy development, and financial reporting. Our mission is to help clients make informed decisions, optimize property investments, and navigate real estate transactions with confidence.",
        linkText: "Get Land",
        linkHref: "/consultancy",
        accentColor: "bg-gradient-to-br from-rose-50 to-rose-100",
    },
];

const DiscoverSection = () => {
    return (
        <motion.section
            id="DiscoverSection"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="py-16 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="w-full">
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-12 max-w-4xl mx-auto px-4 sm:px-6"
                >
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-purple-700 uppercase font-sans">
                        Our Services
                    </h1>
                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
                        Discover Your Ideal Property
                    </h2>
                    <p className="mt-6 text-base sm:text-lg leading-7 text-gray-600 font-light">
                        Experience a seamless journey from property search to move-in with our comprehensive real estate solutions.
                    </p>
                </motion.div>

                <div className="flex flex-col">
                    {features.map((feature, index) => (
                        <DiscoverCard key={index} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const DiscoverCard = ({
                          imageSrc,
                          title,
                          description,
                          linkText,
                          linkHref,
                          accentColor,
                          index,
                      }: {
    imageSrc: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    accentColor: string;
    index: number;
}) => {
    const isImageRight = index % 2 === 0;

    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-stretch bg-white border-y border-gray-100 first:border-t-0 last:border-b-0 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <div
                className={`flex-1 ${isImageRight ? "md:order-2" : "md:order-1"} relative w-full aspect-[4/3]`}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

            </div>
            <div
                className={`flex-1 p-6 sm:p-8 md:p-12 ${isImageRight ? "md:order-1" : "md:order-2"} ${accentColor} flex flex-col justify-center`}
            >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base leading-7 font-light">{description}</p>
                <MotionLink
                    href={linkHref}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-600 transition-all duration-300 w-fit focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    scroll={false}
                    variants={linkVariants}
                    whileHover="hover"
                >
                    {linkText}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </MotionLink>
            </div>
        </motion.div>
    );
};

export default DiscoverSection;