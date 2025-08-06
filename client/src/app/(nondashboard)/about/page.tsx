"use client";

import React from "react";

import FooterSection from "@/app/(nondashboard)/landing/FooterSection";
import NewsLetter from "@/components/NewsLetter";
import About from "@/app/(nondashboard)/about/About";
import BreadCrumb from "@/components/BreadCrumb";
import Mission from "@/app/(nondashboard)/about/Mission";
import AboutCard from "@/app/(nondashboard)/about/AboutCard";

const SearchPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <main className="flex flex-col flex-1">
                <BreadCrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'About us', href: '/about' },

                    ]}
                />
                <About />
                <AboutCard/>
                <Mission />
                <NewsLetter/>
                <FooterSection />
            </main>
        </div>
    );
};

export default SearchPage;
