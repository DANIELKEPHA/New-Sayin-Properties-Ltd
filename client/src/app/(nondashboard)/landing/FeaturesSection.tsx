"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const cardHoverVariants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};
const features = [
  {
    imageSrc: "/landing-search1.png",
    title: "Property Listings",
    description: "A seamless path to buying and selling with verified listings and transparent guidance.",
    linkText: "Explore Properties",
    linkHref: "/search",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    imageSrc: "/landing-search3.png",
    title: "Land Acquisition",
    description: "Discover land with clarity, offering detailed zoning and enlightened development insights.",
    linkText: "Discover Land",
    linkHref: "/land",
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    imageSrc: "/landing-search2.png",
    title: "Legal conveyancing",
    description: "Harmonious legal processes with trusted partners for smooth property transitions.",
    linkText: "Learn More",
    linkHref: "/conveyancing",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    imageSrc: "/landing-construction.png",
    title: "Real Estate Developers",
    description: "Comprehensive construction solutions for innovative and sustainable property development.",
    linkText: "Build with Us",
    linkHref: "/construction",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    imageSrc: "/landing-consultancy.png",
    title: "Real Estate Consultancy",
    description: "Expert guidance to navigate market trends and optimize your property investments.",
    linkText: "Get Land",
    linkHref: "/consultancy",
    gradient: "from-purple-500 to-blue-500"
  }
];

const FeaturesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (features.length - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? features.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
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
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Streamline Your Property Journey
            </motion.h2>
            <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Enlightened tools to guide you to your perfect property with wisdom and ease.
            </motion.p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {displayedFeatures.map((feature, index) => (
                  <motion.div
                      key={`${currentIndex}-${index}`}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 40 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full relative"
                  >
                    <FeatureCard {...feature} />

                    {index < displayedFeatures.length - 1 && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.3 }}
                            className="hidden md:block absolute top-1/2 right-[-1.5rem] w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-400 origin-left"
                        />
                    )}
                  </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-4">
              <motion.button
                  onClick={handlePrev}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-full bg-white shadow-md text-purple-600 hover:bg-purple-50 transition-colors"
                  aria-label="Previous features"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                  onClick={handleNext}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-full bg-white shadow-md text-purple-600 hover:bg-purple-50 transition-colors"
                  aria-label="Next features"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
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
                       gradient
                     }: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  gradient: string;
}) => (
    <motion.div
        variants={cardHoverVariants}
        whileHover="hover"
        className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className={`h-48 bg-gradient-to-r ${gradient} relative overflow-hidden`}>
        <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover mix-blend-multiply opacity-90"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Link
            href={linkHref}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            scroll={false}
        >
          {linkText}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
);

export default FeaturesSection;