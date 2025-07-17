"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100
    }
  },
};

const cardHoverVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const features = [
  {
    imageSrc: "/landing-search1.png",
    title: "Property Listings",
    description: "A seamless path to buying and selling with verified listings and transparent guidance.",
    linkText: "Explore Properties",
    linkHref: "/search"
  },
  {
    imageSrc: "/landing-search3.png",
    title: "Land Acquisition",
    description: "Discover land with clarity, offering detailed zoning and enlightened development insights.",
    linkText: "Discover Land",
    linkHref: "/land"
  },
  {
    imageSrc: "/landing-search2.png",
    title: "Legal conveyancing",
    description: "Harmonious legal processes with trusted partners for smooth property transitions.",
    linkText: "Learn More",
    linkHref: "/conveyancing"
  },
  {
    imageSrc: "/landing-construction.png",
    title: "Real Estate Developers",
    description: "Comprehensive construction solutions for innovative and sustainable property development.",
    linkText: "Build with Us",
    linkHref: "/construction"
  },
  {
    imageSrc: "/landing-consultancy.png",
    title: "Real Estate Land",
    description: "Expert guidance to navigate market trends and optimize your property investments.",
    linkText: "Get Land",
    linkHref: "/consultancy"
  }
];

const FeaturesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (features.length - 2));
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? features.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === features.length - 3 ? 0 : prevIndex + 1
    );
  };

  const displayedFeatures = features.slice(currentIndex, currentIndex + 3);

  return (
      <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-28 px-6 sm:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-purple-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold text-purple-900 mb-4 font-serif"
            >
              Streamline Your Property Journey
            </motion.h2>
            <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 max-w-2xl mx-auto font-light"
            >
              Enlightened tools to guide you to your perfect property with wisdom and ease.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedFeatures.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                >
                  <FeatureCard {...feature} />
                </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
                onClick={handlePrev}
                variants={buttonVariants}
                whileHover="hover"
                className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-gold-600 text-white hover:from-purple-700 hover:to-gold-700 transition-all duration-200"
                aria-label="Previous features"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.button>
            <motion.button
                onClick={handleNext}
                variants={buttonVariants}
                whileHover="hover"
                className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-gold-600 text-white hover:from-purple-700 hover:to-gold-700 transition-all duration-200"
                aria-label="Next features"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.section>
  );
};

const FeatureCard = ({
                       imageSrc,
                       title,
                       description,
                       linkText,
                       linkHref,
                     }: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => (
    <motion.div
        variants={cardHoverVariants}
        className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-purple-100 to-gold-100 flex items-center justify-center h-48 relative overflow-hidden">
          <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-purple-900 mb-3 font-serif">{title}</h3>
        <p className="text-gray-700 mb-6 flex-grow font-light">{description}</p>
        <Link
            href={linkHref}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 transition-all duration-200"
            scroll={false}
        >
          {linkText}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
);

export default FeaturesSection;